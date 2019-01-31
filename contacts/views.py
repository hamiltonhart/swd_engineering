from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin

from . import models


class ContactList(LoginRequiredMixin, ListView):
    model = models.Contact
    template_name = "contact_list.html"
    context_object_name = "contact_list"
