from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django import forms

from . import models
from .forms import RentalProjectForm

# All Projects


# class RentalProjectListView(LoginRequiredMixin, ListView):
#     template_name = "rental_project_list.html"
#     context_object_name = "project"

#     def get_context_data(self, **kwargs):
#         context = super(RentalProjectListView, self).get_context_data(**kwargs)
#         context['features'] = models.Feature.objects.all()
#         context['series'] = models.Series.objects.all()
#         return context

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

# Series Project Views


# class SeriesProjectCreateView(LoginRequiredMixin, CreateView):
#     model = models.Series
#     template_name = "rental_project_new.html"


# class SeriesProjectListView(LoginRequiredMixin, ListView):
#     model = models.Series
#     template_name = "series_project_list.html"
#     context_object_name = "project"
    
#     def get_queryset(self):
#         return models.Series.objects.all()


# class SeriesProjectDetailView(LoginRequiredMixin, ListView):
#     model = models.Series
#     template_name = "series_project_detail.html"
#     context_object_name = "project"


# class SeriesProjectUpdateView(LoginRequiredMixin, UpdateView):
#     model = models.Series
#     template_name = "rental_project_update.html"


# class SeriesProjectDeleteView(LoginRequiredMixin, DeleteView):
#     model = models.Series
#     context_object_name = "project"
#     template_name = "rental_project_delete.html"
#     success_url = reverse_lazy("series_project_list")
