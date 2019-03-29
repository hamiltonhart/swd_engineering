from django.urls import path

from .views import project_client_ms_list, project_client_detail

app_name = "project_clients"

urlpatterns = [
    path('<str:abbr>/mslist', project_client_ms_list, name='project_clients_ms_list'),
    path('<str:abbr>/<int:pk>', project_client_detail, name='project_client_detail'),
]