import pandas as pd
from pymongo import MongoClient
from sklearn.neighbors import NearestNeighbors
import pickle
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

def train_model():
    print("🚀 Starting model training...")

    client = MongoClient(MONGO_URI)
    db = client["autohaus"]
    orders = list(db.orders.find({"type": {"$regex": "purchase", "$options": "i"}}))

    print(f"📦 Total 'purchase' orders fetched: {len(orders)}")

    if not orders:
        print("❌ No purchase orders found.")
        return

    data = []
    for order in orders:
        user_id = str(order.get("user"))
        car_id = str(order.get("car"))
        print(f"🧾 User: {user_id} | Car: {car_id}")
        if user_id and car_id:
            data.append((user_id, car_id))

    print(f"✅ Total user-car pairs: {len(data)}")
    if not data:
        print("⚠️ No valid user-car data to train on.")
        return

    df = pd.DataFrame(data, columns=["userId", "carId"])
    df["purchased"] = 1

    pivot = df.pivot_table(index="userId", columns="carId", values="purchased", fill_value=0)
    print(f"📊 Pivot table shape: {pivot.shape}")

    model = NearestNeighbors(metric="cosine", algorithm="brute")
    model.fit(pivot)

    with open("model.pkl", "wb") as f:
        pickle.dump((model, pivot), f)

    print("✅ Model trained and saved as model.pkl")