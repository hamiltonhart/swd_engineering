from django.urls import path
from . import views

app_name = "rental_projects"

urlpatterns = [
    # path('list/all/', views.RentalProjectListView.as_view(), name="project_list"),
    path('new/', views.RentalProjectCreateView.as_view(), name="rental_projects_create"),
    path('list/all/', views.RentalProjectListView.as_view(), name="rental_projects_list"),
    path('<int:pk>/', views.RentalProjectDetailView.as_view(), name="rental_projects_detail"),
    path("update/<int:pk>/", views.RentalProjectUpdateView.as_view(), name="rental_projects_update"),
    path("delete/<int:pk>/", views.RentalProjectDeleteView.as_view(), name="rental_projects_delete"),
    # path('series/new/', views.SeriesProjectCreateView.as_view(), name="series_create"),
    # path('series/list/all/', views.SeriesProjectListView.as_view(), name="series_list"),
    # path('series/<int:pk>/', views.SeriesProjectDetailView.as_view(), name="series_detail"),
    # path("series/update/<int:pk>/", views.SeriesProjectUpdateView.as_view(), name="series_update"),
    # path("series/delete/<int:pk>/", views.SeriesProjectDeleteView.as_view(), name="series_delete"),
]
