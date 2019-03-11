from django.urls import path

from .views import project_client_ms_list

app_name = "project_clients"

urlpatterns = [
    path('media_shuttle/<int:pk>/', project_client_ms_list, name='project_client_ms_list')
]