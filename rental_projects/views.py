from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django import forms

from . import models
from .forms import RentalProjectForm

# Feature Project Views


class RentalProjectCreateView(LoginRequiredMixin, CreateView):
    model = models.RentalProject
    template_name = "rental_projects_new.html"
    form_class = RentalProjectForm


class RentalProjectListView(LoginRequiredMixin, ListView):
    model = models.RentalProject
    template_name = "rental_projects_list.html"
    context_object_name = "projects_list"

    def get_queryset(self):
        return models.RentalProject.objects.all().order_by('title')


class RentalProjectDetailView(LoginRequiredMixin, DetailView):
    model = models.RentalProject
    template_name = "rental_projects_detail.html"
    context_object_name = "project"


class RentalProjectUpdateView(LoginRequiredMixin, UpdateView):
    model = models.RentalProject
    template_name = "rental_projects_update.html"
    context_object_name = "project"
    form_class = RentalProjectForm


class RentalProjectDeleteView(LoginRequiredMixin, DeleteView):
    model = models.RentalProject
    context_object_name = "project"
    template_name = "rental_projects_delete.html"
    success_url = reverse_lazy("rental_projects:rental_projects_list")
