from django.urls import path
from . import views

app_name = "contacts"

urlpatterns = [
    path('new/', views.ContactCreateView.as_view(), name="contacts_create"),
    path('list/all/', views.ContactListView.as_view(), name="contacts_list"),
    path('<int:pk>/', views.ContactDetailView.as_view(), name="contacts_detail"),
    path("update/<int:pk>/", views.ContactUpdateView.as_view(), name="contacts_update"),
    path("delete/<int:pk>/", views.ContactDeleteView.as_view(), name="contacts_delete"),
]
    