from django.db import models
from django.contrib.auth.models import User

class PatientProfile(models.Model):
    SERVICE_CHOICES = [
        ('general', 'General Visit'),
        ('Surgery', 'Post Surgery'),
        ('Elderly', 'Elderly Care'),
        ('Pedo', 'Pediatric Care'),
        ('pregnancy', 'Post Pregnancy Care'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pin_code = models.CharField(max_length=10)
    date = models.DateField()
    time = models.TimeField()
    symptoms = models.TextField()
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.date} {self.time}"
