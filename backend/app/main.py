from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app import models
from app.routes import router
from app.schemas import SymptomRequest
from app.ai_engine import analyze_symptoms

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Patient Intake System",
    version="1.0"
)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(router)

@app.get("/")
def home():
    return {"message": "Patient Intake Backend Running Successfully"}

@app.post("/analyze-symptoms")
def analyze(request: SymptomRequest):
    return analyze_symptoms(request.symptoms)