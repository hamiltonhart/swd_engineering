from django.urls import path
from . import views

app_name = "project_rooms"

urlpatterns = [
    path('<str:abbr>/edit/', views.manage_project_rooms, name="project_rooms_add_edit"),
]