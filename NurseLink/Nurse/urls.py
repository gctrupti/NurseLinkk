from django.urls import path
from . import views

urlpatterns = [
    path('best_nurse/<int:patient_id>/', views.best_nurse, name='best_nurse'),
    path('error/', views.error, name='error'),
]
