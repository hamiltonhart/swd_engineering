from django.urls import path
from . import views

app_name = "harddrives"

urlpatterns = [
    path('new/', views.DriveCreateView.as_view(), name="harddrives_create"),
    path('list/all/', views.DriveListView.as_view(), name="harddrives_list"),
    path('<int:pk>/', views.DriveDetailView.as_view(), name="harddrives_detail"),
    path("update/<int:pk>/", views.DriveUpdateView.as_view(), name="harddrives_update"),
    path("delete/<int:pk>/", views.DriveDeleteView.as_view(), name="harddrives_delete"),
]