from django.urls import path
from . import views

app_name = "rental_projects"

urlpatterns = [
    path('new/', views.RentalProjectCreateView.as_view(), name="rental_projects_create"),
    path('list/<str:display_option>/', views.RentalProjectListView.as_view(), name="rental_projects_list"),
    path("update/<int:pk>/", views.RentalProjectUpdateView.as_view(), name="rental_projects_update"),
    path("delete/<int:pk>/", views.RentalProjectDeleteView.as_view(), name="rental_projects_delete"),
    path('<int:pk>/', views.project_detail_view, name="rental_projects_detail"),
    path('<int:pk>/remove_project_drives/', views.delete_rental_project_drives, name='rental_project_drives_delete'),
    path('<int:pk>/backup/', views.rental_project_backup, name="rental_projects_backup"),
    # path('new/', views.project_create_view, name="rental_projects_create"),
    # path('<int:pk>/', views.RentalProjectDetailView.as_view(), name="rental_projects_detail"),
]
