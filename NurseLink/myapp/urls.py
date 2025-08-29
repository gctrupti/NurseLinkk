from django.urls import path
from . import views

urlpatterns = [
    path("", views.user_form, name="user_form"),
    path("match-nurse/", views.match_nurse, name="match_nurse"),
]
