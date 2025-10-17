import os
import re
import json
import pandas as pd
from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from .models import UserProfile
import google.generativeai as genai

# Configure Gemini once using API key from settings.py
genai.configure(api_key=settings.GEMINI_API_KEY)


def match_nurse(request):
    """
    Fetch latest patient request from DB,
    match with nurses in CSV using Gemini,
    and return the best match in a template.
    """

    # 1. Fetch latest patient data
    try:
        latest_request = UserProfile.objects.latest('id')
    except UserProfile.DoesNotExist:
        return render(request, "myapp/match_nurse.html", {
            "error": "No patient requests found in the database."
        })

    request_data = {
        "name": latest_request.name,
        "age": latest_request.age,
        "gender": latest_request.gender,
        "email": latest_request.email,
        "specialization": latest_request.specialization,
        "location": latest_request.location,
        "need": latest_request.need,
    }

    # 2. Load nurse profiles from CSV
    try:
        nurses_df = pd.read_csv("nursedata.csv")
        nurse_profiles = nurses_df.to_dict(orient="records")
    except FileNotFoundError:
        return render(request, "myapp/match_nurse.html", {
            "error": "Nurse data CSV file not found."
        })

    # 3. Prepare prompt for the LLM (force schema!)
    prompt = f"""
    You are an expert medical personnel matcher. Your task is to select the best nurse profile from a list
    to match a patient's request. Consider all available information for both the patient and the nurses.

    Patient request:
    {json.dumps(request_data, indent=2)}

    Nurse profiles:
    {json.dumps(nurse_profiles, indent=2)}

    Task:
    1. Analyze the patient's needs and compare them to the skills, specialization, and location of the nurses.
    2. Select the single best nurse for the patient.
    3. Provide a clear reason for your choice.
    4. Respond ONLY in JSON format, with this exact schema:
    {{
      "best_match": {{
        "Nurse_ID": "...",
        "Name": "...",
        "Age": "...",
        "Gender": "...",
        "Experience_Years": "...",
        "Specialization": "...",
        "Hospital": "...",
        "Shift": "...",
        "Location": "...",
        "Contact": "...",
        "Email": "...",
        "Available": "..."
      }},
      "reason": "..."
    }}
    """

    # 4. Call Gemini LLM
    try:
        model = genai.GenerativeModel("models/gemini-2.0-flash")
        response = model.generate_content(prompt, generation_config={"temperature": 0.2})

        raw_output = response.text.strip()

        # --- Safe JSON parsing ---
        try:
            parsed = json.loads(raw_output)
        except json.JSONDecodeError:
            match = re.search(r'\{.*\}', raw_output, re.DOTALL)
            if match:
                parsed = json.loads(match.group())
            else:
                parsed = {"best_match": None, "reason": f"Invalid JSON output: {raw_output}"}

        best_match = parsed.get("best_match")
        reason = parsed.get("reason", "No reason provided")

        # Ensure best_match is dict, not string
        if isinstance(best_match, str):
            try:
                best_match = json.loads(best_match)
            except Exception:
                best_match = None

        # Normalize keys to expected template fields
        if isinstance(best_match, dict):
            key_map = {
                "Nurse_ID": "Nurse_ID",
                "Name": "Name",
                "Age": "Age",
                "Gender": "Gender",
                "Experience_Years": "Experience_Years",
                "Specialization": "Specialization",
                "Hospital": "Hospital",
                "Shift": "Shift",
                "Location": "Location",
                "Contact": "Contact",
                "Email": "Email",
                "Available": "Available",
            }
            best_match = {key_map.get(k, k): v for k, v in best_match.items()}

    except Exception as e:
        best_match = None
        reason = f"Could not process structured JSON. Raw error: {e}"

    # 5. Render result in template
    return render(request, "myapp/match_nurse.html", {
        "patient": request_data,
        "nurse": best_match,
        "reason": reason
    })


def user_form(request):
    if request.method == "POST":
        user = UserProfile(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            age=request.POST.get("age"),
            gender=request.POST.get("gender"),
            specialization=request.POST.get("specialization"),
            location=request.POST.get("location"),
            date=request.POST.get("date"),
            time=request.POST.get("time"),
            need=request.POST.get("need"),
            address=request.POST.get("address")
        )
        user.save()
        messages.success(request, "Form submitted successfully!")
        return redirect("match_nurse")
    return render(request, "myapp/user_form.html")

