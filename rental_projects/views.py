from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django import forms
from django.contrib.postgres.search import SearchVector
from scripts.search import get_query

from . import models
from .forms import RentalProjectForm, RentalProjectCompletedForm, RentalProjectBackupForm, RentalProjectCompletedForm

from forms.forms import SimpleSearchForm

from project_clients.models import ProjectClient
from project_drives.models import ProjectDrive
from project_rooms.models import ProjectRoom


from project_clients.forms import ProjectClientForm, ProjectClientDeleteForm
from project_drives.forms import ProjectDriveForm
from project_rooms.forms import ProjectRoomForm

import datetime

# Feature Project Views


class RentalProjectCreateView(LoginRequiredMixin, CreateView):
    model = models.RentalProject
    template_name = "rental_projects_new.html"
    form_class = RentalProjectForm


# class RentalProjectListView(LoginRequiredMixin, ListView):
#     model = models.RentalProject
#     template_name = "rental_projects_list.html"
#     context_object_name = "projects_list"

#     def get_queryset(self):
#         if self.kwargs["display_option"] == "all" or self.kwargs["display_option"] == '':
#             return models.RentalProject.objects.all().order_by('title')
#         elif self.kwargs["display_option"] == "current":
#             return models.RentalProject.objects.filter(mixing_complete_date=None).order_by('title')
#         elif self.kwargs["display_option"] == "51":
#             return models.RentalProject.objects.filter(channel_config="5.1")
#         elif self.kwargs["display_option"] == "71":
#             return models.RentalProject.objects.filter(channel_config="7.1")
#         elif self.kwargs["display_option"] == "atmos":
#             return models.RentalProject.objects.filter(channel_config="ATMOS")
#         elif self.kwargs["display_option"] == "imax6":
#             return models.RentalProject.objects.filter(channel_config="IMAX 6")
#         elif self.kwargs["display_option"] == "imax12":
#             return models.RentalProject.objects.filter(channel_config="IMAX 12")


# class RentalProjectDetailView(LoginRequiredMixin, DetailView):
#     model = models.RentalProject
#     template_name = "rental_projects_detail.html"
#     context_object_name = "project"


class RentalProjectUpdateView(LoginRequiredMixin, UpdateView):
    model = models.RentalProject
    template_name = "rental_projects_update.html"
    context_object_name = "project"
    form_class = RentalProjectForm


class RentalProjectDeleteView(LoginRequiredMixin, DeleteView):
    model = models.RentalProject
    context_object_name = "project"
    template_name = "rental_projects_delete.html"
    success_url = reverse_lazy("rental_projects:rental_projects_list", kwargs={
                               "display_option": "all"})


@login_required
def project_detail_view(request, abbr):
    """
    Detail View:
        Handles multiple forms:
            Add/Edit project_clients
            Delete project_clients
            Add project_drives
            Add room
            Project complete/incomplete
        Displays project information with the ability to edit the entire entry or links to sections for further project information.
    """

    project = models.RentalProject.objects.get(abbreviation=abbr)
    project_rooms = ProjectRoom.objects.filter(project=project)
    if request.method == "POST":
        if "client_add_edit" in request.POST:
            add_client_form = ProjectClientForm(request.POST)
            if add_client_form.is_valid():
                client = add_client_form.cleaned_data['client']
                client_role = add_client_form.cleaned_data['client_role']
                try:
                    edit_client = ProjectClient.objects.get(
                        client=client, project=project)
                    edit_client.client_role = client_role
                    edit_client.save()
                except:
                    ProjectClient.objects.create(
                        client=client, project=project, client_role=client_role)

        elif "client_remove" in request.POST:
            add_client_form = ProjectClientForm(request.POST)
            if add_client_form.is_valid():
                client = add_client_form.cleaned_data['client']
                try:
                    client_to_delete = ProjectClient.objects.get(
                        client=client, project=project)
                    client_to_delete.delete()
                except:
                    pass

        elif "drive_add" in request.POST:
            add_drive_form = ProjectDriveForm(request.POST)
            if add_drive_form.is_valid():
                drive = add_drive_form.cleaned_data['drive']
                ProjectDrive.objects.create(drive=drive, project=project)

        elif "add_room" in request.POST:
            add_room_form = ProjectRoomForm(request.POST)
            if add_room_form.is_valid():
                room = add_room_form.cleaned_data['room']
                try:
                    edit_room = ProjectRoom.objects.get(
                        room=room, project=project)
                    edit_room.primary_room = True
                    edit_room.save()
                except:
                    ProjectRoom.objects.create(
                        room=room, project=project, primary_room=True)

        elif "project_incomplete" in request.POST:
            complete_project_form = RentalProjectCompletedForm(request.POST)
            if complete_project_form.is_valid():
                if project.mixing_complete_date:
                    project.mixing_incomplete()

        elif "project_complete" in request.POST:
            complete_project_form = RentalProjectCompletedForm(request.POST)
            if complete_project_form.is_valid():
                project.mixing_completed(request.user)

        return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))

    add_client_form = ProjectClientForm()
    add_drive_form = ProjectDriveForm()
    add_room_form = ProjectRoomForm()

    current_primary = None
    for room in project_rooms:
        if room.primary_room:
            current_primary = room

    context_dict = {
        'project': project,
        'add_client_form': add_client_form,
        'add_drive_form': add_drive_form,
        'add_room_form': add_room_form,
        'current_primary': current_primary,
    }

    return render(request, 'rental_projects_detail.html', context_dict)


def rental_project_list(request, display_option=None):
    """
    Rental Project List:
    Lists rental_projects based on filter selection. All sorted by title.
    If search, it is applied to the overall filter.
    """

    search_form = SimpleSearchForm()
    query_string = None

    if display_option == None or display_option == 'all':
        projects_list = models.RentalProject.objects.all().order_by('title')
    elif display_option == 'current':
        projects_list = models.RentalProject.objects.filter(
            mixing_complete_date=None).order_by('title')
    elif display_option == 'feature':
        projects_list = models.RentalProject.objects.filter(
            season__isnull=True).order_by('title')
    elif display_option == 'series':
        projects_list = models.RentalProject.objects.filter(
            season__isnull=False).order_by('title')
    elif display_option == '51':
        projects_list = models.RentalProject.objects.filter(
            channel_config="5.1").order_by('title')
    elif display_option == '71':
        projects_list = models.RentalProject.objects.filter(
            channel_config="7.1").order_by('title')
    elif display_option == 'atmos':
        projects_list = models.RentalProject.objects.filter(
            channel_config="ATMOS").order_by('title')
    elif display_option == 'imax6':
        projects_list = models.RentalProject.objects.filter(
            channel_config="IMAX 6").order_by('title')
    elif display_option == 'imax12':
        projects_list = models.RentalProject.objects.filter(
            channel_config="IMAX 12").order_by('title')
    else:
        projects_list = models.RentalProject.objects.all().order_by('title')

    if request.method == "GET" and 'search_field' in request.GET:
        if request.GET['search_field'] == '':
            search_form = SimpleSearchForm()
        else:
            query_string = request.GET['search_field']
            query = get_query(
                query_string, ['title', 'abbreviation', 'drive_user', 'ms_user'])
            projects_list = projects_list.filter(query).order_by('title')
            search_form = SimpleSearchForm()

    context_dict = {
        'projects_list': projects_list,
        'search_form': search_form,
        'results': query_string,
    }

    return render(request, 'rental_projects_list.html', context_dict)


@login_required
def rental_project_backup(request, abbr):
    project = models.RentalProject.objects.get(abbreviation=abbr)

    if request.method == "POST":
        form = RentalProjectBackupForm(request.POST)
        if form.is_valid():
            project.backup(request.user)

            return HttpResponseRedirect(f'/rental_projects/list/all/')

    form = RentalProjectBackupForm()

    context_dict = {
        "form": form,
        "project": project,
    }

    return render(request, 'rental_projects_backup.html', context_dict)


@login_required
def rental_project_list_redirect_view(request):
    return HttpResponseRedirect(reverse('rental_projects:rental_projects_list', kwargs={"display_option": "all"}))
