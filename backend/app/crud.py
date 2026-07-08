from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app import models, schemas


# -----------------------------
# Create Patient
# -----------------------------
def create_patient(db: Session, patient: schemas.PatientCreate):

    db_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        contact=patient.contact,
        symptoms=patient.symptoms,

        ai_urgency=patient.ai_urgency,
        ai_department=patient.ai_department,

        final_urgency=patient.final_urgency,
        final_department=patient.final_department
    )

    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)

    return db_patient


# -----------------------------
# Get All Patients
# -----------------------------
def get_patients(db: Session):

    return db.query(models.Patient).order_by(
        models.Patient.created_at.desc()
    ).all()


# -----------------------------
# Search Patients
# -----------------------------
from sqlalchemy import func

def search_patients(
    db: Session,
    name=None,
    urgency=None,
    search_date=None
):

    query = db.query(models.Patient)

    # Search by Name
    if name:
        query = query.filter(
            models.Patient.name.ilike(f"%{name}%")
        )

    # Search by Urgency
    if urgency:
        query = query.filter(
            models.Patient.final_urgency == urgency
        )

    # Search by Registration Date
    if search_date:
        query = query.filter(
            func.date(models.Patient.created_at) == search_date
        )

    return query.order_by(
        models.Patient.created_at.desc()
    ).all()

# -----------------------------
# Dashboard
# -----------------------------
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app import models


def dashboard(db: Session):

    # ----------------------------
    # Total Patients
    # ----------------------------
    total_patients = db.query(models.Patient).count()

    # ----------------------------
    # Today's Patients
    # ----------------------------
    today = datetime.now().date()

    start = datetime.combine(today, datetime.min.time())
    end = start + timedelta(days=1)

    today_total = (
        db.query(models.Patient)
        .filter(
            models.Patient.created_at >= start,
            models.Patient.created_at < end
        )
        .count()
    )

    # ----------------------------
    # Urgency Statistics
    # ----------------------------
    urgency_rows = (
        db.query(
            models.Patient.final_urgency,
            func.count(models.Patient.id)
        )
        .group_by(models.Patient.final_urgency)
        .all()
    )

    urgency = {
        row[0]: row[1]
        for row in urgency_rows
    }

    # ----------------------------
    # Department Statistics
    # ----------------------------
    department_rows = (
        db.query(
            models.Patient.final_department,
            func.count(models.Patient.id)
        )
        .group_by(models.Patient.final_department)
        .all()
    )

    department = {
        row[0]: row[1]
        for row in department_rows
    }

    # ----------------------------
    # Response
    # ----------------------------
    return {
        "current_time": datetime.now().strftime("%d-%m-%Y %I:%M %p"),
        "total_patients": total_patients,
        "today_total": today_total,
        "urgency": urgency,
        "department": department
    }