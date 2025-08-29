from django.db import models

# Create your models here.

class Nurse_info(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    phone=models.CharField(max_length=15)
    address=models.TextField()
    state=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    Pin_code=models.CharField(max_length=10)
    experience=models.IntegerField()
    specialization=models.CharField(max_length=100)
    availability=models.CharField(max_length=100)
    service_type=models.CharField(max_length=100)
    charges=models.DecimalField(max_digits=10, decimal_places=2)
    varified=models.BooleanField(default=False)