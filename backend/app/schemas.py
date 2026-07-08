from pydantic import BaseModel
from datetime import datetime


# -----------------------------
# Patient Creation Schema
# -----------------------------
class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    contact: str
    symptoms: str

    ai_urgency: str
    ai_department: str

    final_urgency: str
    final_department: str


# -----------------------------
# Patient Response Schema
# -----------------------------
class PatientResponse(PatientCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# AI Analysis Request
# -----------------------------
class SymptomRequest(BaseModel):
    symptoms: str


# -----------------------------
# AI Analysis Response
# -----------------------------
class AIResponse(BaseModel):
    urgency: str
    department: str