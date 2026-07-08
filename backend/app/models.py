from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String(20), nullable=False)

    contact = Column(String(20), nullable=False)

    symptoms = Column(String, nullable=False)

    ai_urgency = Column(String(20))

    ai_department = Column(String(100))

    final_urgency = Column(String(20))

    final_department = Column(String(100))

    created_at = Column(DateTime(timezone=True), server_default=func.now())