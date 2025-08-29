# Nurse/views.py

from django.shortcuts import render, get_object_or_404
from booking.models import PatientProfile
import pandas as pd
import json
from .utils import query_granite
from django.conf import settings
import os

def best_nurse(request, patient_id):  # <-- renamed here
    patient = get_object_or_404(PatientProfile, id=patient_id)

    csv_path = os.path.join(settings.BASE_DIR, "Nurse", "nursedata.csv")
    try:
        nurse_df = pd.read_csv(csv_path)
    except FileNotFoundError:
        return render(request, "Nurse/error.html", {"error": "Nurse data CSV not found."})

    nurse_profiles = nurse_df.to_dict(orient="records")

    user_profile = {
        # "name": patient.name,
        # "age": patient.age,
        "location": patient.city,
        "medical_needs": patient.symptoms
    }

    prompt = f"""
    You are an expert nurse-matching system.
    Match this user profile with the best nurse from the list:

    User profile:
    {json.dumps(user_profile)}

    Nurse profiles:
    {json.dumps(nurse_profiles)}

    Return only the best matching nurse as a JSON object.
    """

    try:
        best_nurse_json = query_granite(prompt)
        best_nurse = json.loads(best_nurse_json)
    except Exception as e:
        return render(request, "Nurse/error.html", {"error": str(e)})

    return render(request, "best_nurse", {"patient": patient, "nurse": best_nurse})

def error(request):
    return render(request, "Nurse/error.html", {"error": "An error occurred while processing your request."})
