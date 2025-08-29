# Nurse/views.py

from django.shortcuts import render
from .models import Nurse_info

def list_nurses(request):
    """
    Retrieves all nurse profiles from the database and displays them.
    """
    # Fetch all objects from the Nurse_info model
    all_nurses = Nurse_info.objects.all()
    
    # Pass the QuerySet of nurses to the template context
    return render(request, "Nurse/matching_nurses.html", {"nurses": all_nurses})