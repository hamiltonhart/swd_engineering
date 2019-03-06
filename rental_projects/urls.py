from django.urls import path
from . import views

app_name = "rental_projects"

urlpatterns = [
    path('new/', views.RentalProjectCreateView.as_view(), name="rental_projects_create"),
    path('list/<str:display_option>/', views.RentalProjectListView.as_view(), name="rental_projects_list"),
    path('<int:pk>/', views.RentalProjectDetailView.as_view(), name="rental_projects_detail"),
    path("update/<int:pk>/", views.RentalProjectUpdateView.as_view(), name="rental_projects_update"),
    path("delete/<int:pk>/", views.RentalProjectDeleteView.as_view(), name="rental_projects_delete"),
]
