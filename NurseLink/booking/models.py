from django.db import models

# Create your models here.

class Paitent_booking(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    phone=models.CharField(max_length=15)
    address=models.TextField()
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    Pin_code=models.CharField(max_length=10)
    date=models.DateField()
    time=models.TimeField()
    symptoms=models.TextField()
    Nurse_Name=models.CharField(max_length=100)
    Service_Type=models.CharField(max_length=100)

