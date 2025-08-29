# Nurse/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('nurses/', views.list_nurses, name='list_nurses'),
]