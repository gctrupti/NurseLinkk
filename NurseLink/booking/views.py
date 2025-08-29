from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import PatientBookingForm

def home(request):
    return render(request, 'booking/home.html')

def booking(request):
    return render(request, 'booking/booking.html')

@login_required
def patient_booking(request):
    if request.method == 'POST':
        form = PatientBookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.user = request.user  # link booking to the logged-in user
            booking.save()
            return redirect('list_nurses')  # Redirect to best nurse view with patient ID
    else:
        form = PatientBookingForm()
    
    return render(request, 'booking/patient_booking.html', {'form': form})

def booking_success(request):
    return render(request, 'booking/booking_success.html')
