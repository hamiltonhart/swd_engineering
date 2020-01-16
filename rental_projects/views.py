from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django import forms
from django.contrib.postgres.search import SearchVector
from scripts.search import get_query

from . import models
from .forms import RentalProjectForm, RentalProjectCompletedForm, RentalProjectBackupForm, RentalProjectCompletedForm, RentalProjectQuickForm

from forms.forms import SimpleSearchForm, FilterSearchForm

from project_clients.models import ProjectClient, ClientMediaShuttle
from project_drives.models import ProjectDrive
from project_rooms.models import ProjectRoom
from contacts.models import Contact


from project_clients.forms import ProjectClientForm, ProjectClientDeleteForm
from project_drives.forms import ProjectDriveForm
from project_rooms.forms import ProjectRoomForm, ProjectRoomAddEditRemoveForm
from contacts.forms import ContactsShortForm
from project_clients.forms import ClientMediaShuttleForm

import datetime

# Feature Project Views


class RentalProjectCreateView(LoginRequiredMixin, CreateView):
    model = models.RentalProject
    template_name = "rental_projects_new.html"
    form_class = RentalProjectForm


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
        
        elif "project_backup" in request.POST:
            backup_form = RentalProjectBackupForm(request.POST)
            if backup_form.is_valid():
                project.backup(request.user)

        elif "create_contact" in request.POST:
            contact_form = ContactsShortForm(request.POST)
            if contact_form.is_valid():
                data = contact_form.cleaned_data
                new_contact = Contact.objects.create(
                    first_name=data["first_name"],
                    last_name=data["last_name"],
                    phone_number=data["phone_number"],
                    email=data["email"],
                    company=data["company"],
                    title=data["title"],
                    country='US',
                )
        elif "ms_add_edit" in request.POST:
            form = ClientMediaShuttleForm(request.POST, project=project)
            if form.is_valid():
                room_pk = request.POST["project_room"]
                project_client = form.cleaned_data["project_client"]
                project_room = ProjectRoom.objects.get(pk=room_pk)
                client_ms = form.cleaned_data["client_ms"]

                try:
                    ms_to_edit = ClientMediaShuttle.objects.get(
                        project_client=project_client,
                        project_room=project_room,
                        project=project,
                    )
                    ms_to_edit.client_ms = client_ms
                    ms_to_edit.save()
                    return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))
                except:
                    try:
                        ClientMediaShuttle.objects.create(
                            project_client=project_client,
                            project_room=project_room,
                            project=project,
                            client_ms=client_ms
                        )
                        return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))
                    except:
                        return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))

        elif "ms_delete" in request.POST:
            form = ClientMediaShuttleForm(request.POST, project=project)
            if form.is_valid():
                room_pk = request.POST["project_room"]
                project_client = form.cleaned_data["project_client"]
                project_room = ProjectRoom.objects.get(pk=room_pk)
                client_ms = form.cleaned_data["client_ms"]

                ms_to_delete = ClientMediaShuttle.objects.get(
                    project_client=project_client,
                    project_room=project_room,
                    project=project,
                )

                ms_to_delete.delete()
                return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))
        
        elif "room_add_edit" in request.POST:
            form = ProjectRoomAddEditRemoveForm(request.POST)
            if form.is_valid():
                room = form.cleaned_data["room"]
                if  'primary_room' in request.POST and request.POST['primary_room'] == 'on':
                    is_primary = True
                else:
                    is_primary = False

                if is_primary:
                    for project_room in project.rental_rooms.all():
                        if project_room.primary_room:
                            project_room.primary_room = False
                            project_room.save()

                try:
                    edit_project_room = ProjectRoom.objects.get(room=room, project=project)
                    edit_project_room.primary_room = is_primary
                    edit_project_room.save()
                except:
                    
                    new_project_room = ProjectRoom.objects.create(room=room, project=project, primary_room=is_primary)
                    new_project_room.save()

        elif "room_remove" in request.POST:
            form = ProjectRoomAddEditRemoveForm(request.POST)
            if form.is_valid():
                room = form.cleaned_data['room']
                try:
                    project_room_delete = ProjectRoom.objects.get(room=room, project=project)
                    project_room_delete.delete()
                    return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))
                except:
                    return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))
        
        elif "project_delete" in request.POST:
            try:
                project.delete()

                return HttpResponseRedirect(reverse("rental_projects:rental_projects_list", kwargs={'display_option':'current'}))
            except:
                pass
            

        return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))

    add_client_form = ProjectClientForm()
    add_drive_form = ProjectDriveForm()
    add_room_form = ProjectRoomForm()
    backup_form = RentalProjectBackupForm()
    ms_client_form = ClientMediaShuttleForm(project=project)
    room_form = ProjectRoomAddEditRemoveForm()

    current_primary = None
    for room in project_rooms:
        if room.primary_room:
            current_primary = room

    context_dict = {
        'project': project,
        'add_client_form': add_client_form,
        'add_drive_form': add_drive_form,
        'add_room_form': add_room_form,
        'backup_form': backup_form,
        'ms_client_form': ms_client_form,
        'room_form': room_form,
        'current_primary': current_primary,
    }

    return render(request, 'rental_projects_detail.html', context_dict)

@login_required
def rental_project_list(request, display_option=None):
    """
    Rental Project List:
    Lists rental_projects based on filter selection. All sorted by title.
    If search, it is applied to the overall filter.
    """

    filter_search_form = FilterSearchForm()
    new_project_form = RentalProjectQuickForm()
    query_string = None


    '''
    FILTERING

    Status:
    all, current, completed, erased
    0, 1, 2, 3

    Format:
    all, ST, 5.1, 7.1, ATMOS, DTS, IMAX 6, IMAX 12
    0, 1, 2, 3, 4, 5, 6, 7

    Type:
    all, features, series
    0, 1, 2
    '''

    status_options = {
        "0": models.RentalProject.objects.all().order_by('title'),
        "1": models.RentalProject.objects.current().order_by('title'),
        "2": models.RentalProject.objects.mixing_complete().order_by('title'),
        "3": models.RentalProject.objects.project_complete().order_by('title')
    }


    format_options = {
        "1": "ST",
        "2": "5.1",
        "3": "7.1",
        "4": "ATMOS",
        "5": "DTS",
        "6": "IMAX 6", 
        "7": "IMAX 12"
    }

    type_options = {
        "1": True,
        "2": False
    }

    if display_option == None:
        projects_list = models.RentalProject.objects.all().order_by('title')
    else:
        display_option = [x for x in display_option]

        projects_list = status_options[display_option[0]]
        
        if display_option[1] == "0":
            pass
        else:
            projects_list = projects_list.filter(channel_config=format_options[display_option[1]])
        
        if display_option[2] == "0":
            pass
        else:
            projects_list = projects_list.filter(season__isnull=type_options[display_option[2]])

        filter_search_form.fields['status_field'].initial = filter_search_form.fields['status_field'].choices[int(display_option[0])]
        filter_search_form.fields['channel_config_field'].initial = filter_search_form.fields['channel_config_field'].choices[int(display_option[1])]
        filter_search_form.fields['type_field'].initial = filter_search_form.fields['type_field'].choices[int(display_option[2])]



    if request.method == "GET":
            if 'search_filter' in request.GET or 'clear_search' in request.GET:
                projects_list = status_options[request.GET['status_field']]
            
                if request.GET['channel_config_field'] == "0":
                    pass
                else:
                    projects_list = projects_list.filter(channel_config=format_options[request.GET['channel_config_field']])
                
                if request.GET['type_field'] == "0":
                    pass
                else:
                    projects_list = projects_list.filter(season__isnull=type_options[request.GET['type_field']])

                if 'search_field' in request.GET and request.GET['search_field']:
                    query_string = request.GET['search_field']
                    query = get_query(
                        query_string, ['title', 'abbreviation', 'drive_user', 'ms_user'])
                    projects_list = projects_list.filter(query)

                filter_search_form = FilterSearchForm(request.GET)

    if request.method == "POST":
        new_project_form = RentalProjectQuickForm(request.POST)
        if new_project_form.is_valid():
            title = new_project_form.cleaned_data['title']
            season = new_project_form.cleaned_data['season']
            abbr = new_project_form.cleaned_data['abbreviation']
            pt_vers = new_project_form.cleaned_data['protools_vers']
            link = new_project_form.cleaned_data['files_link']
            new_project = models.RentalProject.objects.create(
                title=title,
                season=season,
                abbreviation=abbr,
                protools_vers=pt_vers,
                files_link=link,
                channel_config="5.1",
                start_date=datetime.date.today()
                )
            if abbr == "":
                abbr = new_project.abbreviation
            return HttpResponseRedirect(reverse("rental_projects:rental_projects_detail", kwargs={"abbr": abbr}))


    context_dict = {
        'projects_list': projects_list,
        'filter_search_form': filter_search_form,
        'results': query_string,
        'new_project_form': new_project_form
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
