from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin

from . import models


class ContactCreateView(LoginRequiredMixin, CreateView):
    model = models.Contact
    template_name = "contacts_new.html"
    fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'company',
            'title', 'notes'
        ]


class ContactListView(LoginRequiredMixin, ListView):
    model = models.Contact
    template_name = "contacts_list.html"
    context_object_name = "contacts_list"

    def get_queryset(self):
        return models.Contact.objects.all().order_by('first_name')


class ContactDetailView(LoginRequiredMixin, DetailView):
    model = models.Contact
    template_name = "contacts_detail.html"
    context_object_name = "contact"


class ContactUpdateView(LoginRequiredMixin, UpdateView):
    model = models.Contact
    template_name = "contacts_update.html"
    context_object_name = "contact"
    fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'company',
            'title', 'notes'
        ]


class ContactDeleteView(LoginRequiredMixin, DeleteView):
    model = models.Contact
    template_name = "contacts_delete.html"
    success_url = reverse_lazy("contacts:contacts_list")
    context_object_name = "contact"
