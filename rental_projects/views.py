from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django import forms

from . import models
from .forms import RentalProjectForm
# RentalProjectAddClientForm

from project_clients.models import ProjectClient
from project_drives.models import ProjectDrive
from project_rooms.models import ProjectRoom
# from contacts.models import Contact

from project_clients.forms import ProjectClientForm
from project_drives.forms import ProjectDriveForm
from project_rooms.forms import ProjectRoomForm

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
def project_detail_view(request, pk):
    
    project = models.RentalProject.objects.get(pk=pk)
    if request.method == "POST":
        
        add_client_form = ProjectClientForm(request.POST)
        add_drive_form = ProjectDriveForm(request.POST)
        add_room_form = ProjectRoomForm(request.POST)

        if add_client_form.is_valid():
            client = add_client_form.cleaned_data['client']
            client_role = add_client_form.cleaned_data['client_role']
            ProjectClient.objects.create(client=client, project=project, client_role=client_role)
        elif add_drive_form.is_valid():
            drive = add_drive_form.cleaned_data['drive']
            ProjectDrive.objects.create(drive=drive, project=project)
        elif add_room_form.is_valid():
            room = add_room_form.cleaned_data['room']
            ProjectRoom.objects.create(room=room, project=project)

        return HttpResponseRedirect(f'/rental_projects/{pk}/')    
    
    add_client_form = ProjectClientForm()
    add_drive_form = ProjectDriveForm()
    add_room_form = ProjectRoomForm()

    context_dict = {
        'project':project,
        'add_client_form':add_client_form,
        'add_drive_form':add_drive_form,
        'add_room_form':add_room_form,
    }


    return render(request, 'rental_projects_detail.html', context_dict)