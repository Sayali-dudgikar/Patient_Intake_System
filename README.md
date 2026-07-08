# 🏥 AI-Powered Patient Intake System

An AI-assisted patient registration and triage system built using React, FastAPI, SQLite, and SQLAlchemy.

The application helps hospital staff register patients, automatically analyze symptoms, assign urgency levels, recommend departments, search patient records, and monitor registrations through a dashboard.


Features

 Patient Registration

- Register new patients
- Name, Age, Gender, Contact Number
- Symptom entry
- Contact number validation (10 digits)

--------------------------------------------------------

 AI Symptom Analysis

Automatically predicts:

- Urgency Level
    - Routine
    - Priority
    - Urgent

- Recommended Department

Examples:

| Symptoms | Department | Urgency |
|----------|------------|----------|
| Chest pain | Cardiology | Urgent |
| Heart attack | Emergency | Urgent |
| Skin rash | Dermatology | Routine |
| Back pain | Orthopedics | Priority |

---------------------------------------------------------
 Search Patients

Search patients using:

- Name
- Registration Date
- Urgency Level

View results in a searchable table.

--------------------------------------------------------

 Dashboard

Displays

- Total Patients
- Today's Registrations
- Urgency Statistics
- Department-wise Patient Distribution

-------------------------------------------------------

 Delete Patient

Remove patient records from both

- Frontend
- Backend Database

-------------------------------------------------------

 Technology Stack

 Frontend

- React
- Vite
- Axios
- CSS

Backend

- FastAPI
- SQLAlchemy
- Postgresql
- Uvicorn
- Pydantic

--------------------------------------------

 Project Structure

---------------------------------------------
Patient-Intake-System
│
├── backend
│   ├── app
│   ├── venv
│   ├── requirements.txt
│
├── frontend
│   ├── src
│   ├── package.json
│
└── README.md
---------------------------------------------------------

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /patients | Register Patient |
| GET | /patients | Search Patients |
| DELETE | /patients/{id} | Delete Patient |
| POST | /analyze-symptoms | AI Symptom Analysis |
| GET | /dashboard | Dashboard Statistics |

---

## Future Enhancements

- Authentication
- Email Notifications
- Appointment Scheduling
- PDF Reports
- Charts & Analytics
- Machine Learning-based Symptom Prediction
- Export to Excel

---

## Author

**Sayali Dudgikar**

Bachelor of Technology (Information Technology)
