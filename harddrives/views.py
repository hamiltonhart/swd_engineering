from django.shortcuts import render
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView

from . import models
from .forms import RentalDriveForm

class DriveCreateView(LoginRequiredMixin, CreateView):
    model = models.RentalDrive
    template_name = "harddrives_new.html"
    form_class = RentalDriveForm

class DriveListView(LoginRequiredMixin, ListView):
    model = models.RentalDrive
    context_object_name = "drives_list"
    template_name = "harddrives_list.html"
    
    def get_queryset(self):
        return models.RentalDrive.objects.all().order_by('drive_number')

class DriveDetailView(LoginRequiredMixin, DetailView):
    model = models.RentalDrive
    context_object_name = "drive"
    template_name = "harddrives_detail.html"

class DriveUpdateView(LoginRequiredMixin, UpdateView):
    model = models.RentalDrive
    template_name = "harddrives_update.html"
    context_object_name = "drive"
    form_class = RentalDriveForm

class DriveDeleteView(LoginRequiredMixin, DeleteView):
    model = models.RentalDrive
    context_object_name = "drive"
    template_name = "harddrives_delete.html"
    success_url = reverse_lazy("harddrives:harddrives_list")



