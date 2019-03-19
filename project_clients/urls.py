from django.urls import path

from .views import project_client_ms_list

app_name = "project_clients"

urlpatterns = [
    path('<str:abbr>/list', project_client_ms_list, name='project_clients_ms_list')
]