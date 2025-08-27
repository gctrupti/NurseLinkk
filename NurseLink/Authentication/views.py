from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import SignUpForm
# Create your views here.

def index(request):
    return render(request, 'authentication/index.html')

def user_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("home")   # booking home
        else:
            messages.error(request, "Invalid username or password")
            return redirect("login")  # reload login with error

    return render(request, "authentication/login.html")

def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("login")  # redirect to login page after signup
    else:
        form = SignUpForm()
    return render(request, "authentication/signup.html", {"form": form})
