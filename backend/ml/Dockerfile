# backend/ml/Dockerfile

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 5001

ENV MONGO_URI="mongodb+srv://admin:adminali%4012-global@autohaus-cluster.kzrijjk.mongodb.net/autohaus?retryWrites=true&w=majority&appName=autohaus-cluster"

# Start the FastAPI server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5001"]