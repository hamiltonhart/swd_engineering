from django.urls import path
from . import views

app_name = "contacts"

urlpatterns = [
    path('list/all/', views.ContactList.as_view(), name="contact_list"),
]
