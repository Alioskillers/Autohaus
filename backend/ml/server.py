from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
import pickle
import numpy as np
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["autohaus"]

# Load the model and pivot table
try:
    with open("model.pkl", "rb") as f:
        model, pivot = pickle.load(f)
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Failed to load model:", e)

class RequestData(BaseModel):
    userId: str

@app.post("/recommend")
def recommend(data: RequestData):
    try:
        user_id = data.userId
        print(f"🔍 Received request for recommendations for user {user_id}")

        # If user not in pivot table (i.e., not in training data), return popular cars
        if user_id not in pivot.index:
            print(f"⚠️ User {user_id} not in training data — returning popular cars instead")
            return get_popular_cars()

        user_vector = np.array(pivot.loc[user_id]).reshape(1, -1)
        n_neighbors = min(3, len(pivot))
        distances, indices = model.kneighbors(user_vector, n_neighbors=n_neighbors)
        neighbors = pivot.iloc[indices[0]].index.tolist()

        print("🧠 Nearest users:", neighbors)

        current_user_cars = set(pivot.loc[user_id][pivot.loc[user_id] > 0].index)
        recommendations = set()

        for neighbor in neighbors:
            neighbor_cars = pivot.loc[neighbor][pivot.loc[neighbor] > 0].index
            recommendations.update(set(neighbor_cars) - current_user_cars)

        print("🎯 Recommendations:", recommendations)

        if not recommendations:
            print("⚠️ No unique recommendations found — returning popular cars instead")
            return get_popular_cars()

        car_objects = db.cars.find({"_id": {"$in": [ObjectId(cid) for cid in recommendations]}})
        cars = [
            {
                "_id": str(car["_id"]),
                "make": car.get("make"),
                "model": car.get("model"),
                "price": car.get("price"),
                "topSpeed": car.get("topSpeed"),
                "color": car.get("color")
            }
            for car in car_objects
        ]

        return cars

    except Exception as e:
        print("❌ Error during recommendation:", e)
        return []

def get_popular_cars():
    try:
        popular_car_ids = (
            pivot.sum(axis=0)
            .sort_values(ascending=False)
            .head(5)
            .index.tolist()
        )
        car_objects = db.cars.find({
            "_id": {"$in": [ObjectId(cid) for cid in popular_car_ids]}
        })
        return [
            {
                "_id": str(car["_id"]),
                "make": car.get("make"),
                "model": car.get("model"),
                "price": car.get("price"),
                "topSpeed": car.get("topSpeed"),
                "color": car.get("color")
            }
            for car in car_objects
        ]
    except Exception as e:
        print("❌ Failed to fetch popular cars:", e)
        return []