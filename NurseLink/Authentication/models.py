from django.db import models

# Create your models here.

class login(models.Model):
    username=models.CharField(max_length=100)
    password=models.CharField(max_length=100)

# class signup(models.Model):
#     username=models.CharField(max_length=100)
#     email=models.EmailField()
#     password=models.CharField(max_length=100)
#     confirmpassword=models.CharField(max_length=100)

#COMMENTING OUT THIS SINCE IAM USING DJANGO'S INBUILT USER MODEL FOR SIGNUP