from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin

from . import models


class ContactList(LoginRequiredMixin, ListView):
    pass

class ContactClientList(LoginRequiredMixin, ListView):
    model = models.Client
    template_name = "client_list.html"
