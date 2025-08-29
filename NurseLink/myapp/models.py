from django.db import models

class UserProfile(models.Model):
    age = models.IntegerField()
    specialization = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    need = models.CharField(max_length=200)
    address = models.TextField()
    name = models.CharField(max_length=100)
    email = models.EmailField()
    gender = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.name
