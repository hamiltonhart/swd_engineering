from django.urls import path
from . import views

app_name = "contacts"

urlpatterns = [
    path("list/all/", views.ContactList.as_view(), name="all_contacts" ),
    path("list/clients/", views.ContactClientList.as_view(), name="client_contacts"),
    path("list/vendors/", views.ContactVendorList.as_view(), name="vendor_contacts"),
]