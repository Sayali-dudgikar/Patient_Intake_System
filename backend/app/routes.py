from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import schemas, crud
from app.models import Patient
from datetime import date

router = APIRouter()


# -----------------------------
# Save Patient
# -----------------------------
@router.post("/patients", response_model=schemas.PatientResponse)
def save_patient(
    patient: schemas.PatientCreate,
    db: Session = Depends(get_db)
):
    return crud.create_patient(db, patient)


# -----------------------------
# Get/Search Patients
# -----------------------------

@router.get("/patients")
def get_patients(
    name: str = None,
    urgency: str = None,
    search_date: date = None,
    db: Session = Depends(get_db)
):

    if name or urgency or search_date:
        return crud.search_patients(
            db,
            name,
            urgency,
            search_date
        )

    return crud.get_patients(db)
#-----------------------------
#delete Patient
#-----------------------------
from fastapi import HTTPException

@router.delete("/patients/{patient_id}")
def delete_patient(patient_id: int, db: Session = Depends(get_db)):

    patient = db.query(Patient).filter(Patient.id == patient_id).first()

    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()

    return {"message": "Patient deleted successfully"}


# -----------------------------
# Dashboard
# -----------------------------
@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):
    return crud.dashboard(db)