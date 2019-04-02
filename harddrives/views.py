from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.decorators import login_required


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
        # return models.RentalDrive.objects.all().order_by('drive_number')
        if self.kwargs["display_option"] == "all" or self.kwargs["display_option"] == '':
            return models.RentalDrive.objects.all().order_by('drive_number')
        elif self.kwargs["display_option"] == "available":
            return models.RentalDrive.objects.available().order_by('drive_number')
        elif self.kwargs["display_option"] == "in-use":
            return models.RentalDrive.objects.unavailable().order_by('drive_number')
        else:
            return models.RentalDrive.objects.filter(drive_capacity_gb=self.kwargs["display_option"])


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


@login_required
def drive_redirect_list_view(request):
    return HttpResponseRedirect(reverse('harddrives:harddrives_list', kwargs={'display_option': 'available'}))
