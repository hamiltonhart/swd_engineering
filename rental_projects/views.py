from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django import forms

from . import models
from .forms import RentalProjectForm

# Feature Project Views


# class RentalProjectCreateView(LoginRequiredMixin, CreateView):
#     model = models.RentalProject
#     template_name = "rental_projects_new.html"
#     form_class = RentalProjectForm


class RentalProjectListView(LoginRequiredMixin, ListView):
    model = models.RentalProject
    template_name = "rental_projects_list.html"
    context_object_name = "projects_list"

    def get_queryset(self):
        if self.kwargs["display_option"] == "all" or self.kwargs["display_option"] == '':
            return models.RentalProject.objects.all().order_by('title')
        elif self.kwargs["display_option"] == "current":
            return models.RentalProject.objects.filter(mixing_complete_date=None)
        elif self.kwargs["display_option"] == "51":
            return models.RentalProject.objects.filter(channel_config="5.1")
        elif self.kwargs["display_option"] == "71":
            return models.RentalProject.objects.filter(channel_config="7.1")
        elif self.kwargs["display_option"] == "atmos":
            return models.RentalProject.objects.filter(channel_config="ATMOS")
        elif self.kwargs["display_option"] == "imax6":
            return models.RentalProject.objects.filter(channel_config="IMAX 6")
        elif self.kwargs["display_option"] == "imax12":
            return models.RentalProject.objects.filter(channel_config="IMAX 12")


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
    success_url = reverse_lazy("rental_projects:rental_projects_list", kwargs={"display_option":"all"})


# Function Views

@login_required
def project_create_view(request):
    form = RentalProjectForm
    if request.method == "POST":
        if form.is_valid():
            

    return render(request, 'rental_projects_new.html', {'form':form})