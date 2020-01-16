from django.urls import path
from . import views

app_name = "harddrives"

urlpatterns = [
    path('', views.drive_redirect_list_view, name='drive_list_home'),
    path('new/', views.DriveCreateView.as_view(), name="harddrives_create"),
    path('list/<str:display_option>/', views.drive_list_view, name="harddrives_list"),
    path('<int:pk>/', views.drive_detail, name="harddrives_detail"),
    path("update/<int:pk>/", views.DriveUpdateView.as_view(), name="harddrives_update"),
    path("delete/<int:pk>/", views.DriveDeleteView.as_view(), name="harddrives_delete"),
]