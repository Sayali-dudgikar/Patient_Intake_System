def analyze_symptoms(symptoms):

    symptoms = symptoms.lower()

    # Emergency/Cardiology
    if any(word in symptoms for word in [
        "heart attack",
        "cardiac arrest",
        "chest pain",
        "difficulty breathing",
        "breathlessness",
        "severe chest pain"
    ]):
        return {
            "urgency": "Urgent",
            "department": "Emergency"
        }

    # Neurology
    elif any(word in symptoms for word in [
        "headache",
        "migraine",
        "seizure",
        "stroke",
        "dizziness"
    ]):
        return {
            "urgency": "Priority",
            "department": "Neurology"
        }

    # Dermatology
    elif any(word in symptoms for word in [
        "rash",
        "itching",
        "skin",
        "eczema",
        "allergy"
    ]):
        return {
            "urgency": "Routine",
            "department": "Dermatology"
        }

    # Orthopedics
    elif any(word in symptoms for word in [
        "fracture",
        "bone",
        "joint pain",
        "sprain",
        "back pain"
    ]):
        return {
            "urgency": "Priority",
            "department": "Orthopedics"
        }

    # ENT
    elif any(word in symptoms for word in [
        "ear pain",
        "sore throat",
        "tonsils",
        "hearing loss"
    ]):
        return {
            "urgency": "Routine",
            "department": "ENT"
        }

    # Pulmonology
    elif any(word in symptoms for word in [
        "cough",
        "asthma",
        "pneumonia",
        "wheezing"
    ]):
        return {
            "urgency": "Priority",
            "department": "Pulmonology"
        }

    # Default
    else:
        return {
            "urgency": "Routine",
            "department": "General Medicine"
        }