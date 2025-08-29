from django import forms
from .models import PatientProfile

class PatientBookingForm(forms.ModelForm):
    class Meta:
        model = PatientProfile
        fields = [
            'city', 'state', 'pin_code',
            'date', 'time', 'symptoms', 'service_type'
        ]
        widgets = {
            'service_type': forms.Select(),
            'date': forms.DateInput(attrs={'type': 'date'}),
            'time': forms.TimeInput(attrs={'type': 'time'}),
        }
