from django.urls import path
from . import views

app_name = "project_rooms"

urlpatterns = [
    path('<int:pk>/edit/', views.manage_project_rooms, name="project_rooms_add_edit"),
]