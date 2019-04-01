from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required

from .models import ProjectClient, ClientMediaShuttle
from .forms import ClientMediaShuttleForm, ProjectClientNotesForm

from rental_projects.models import RentalProject
from project_rooms.models import ProjectRoom



# Class views


# Function Views

@login_required
def project_client_ms_list(request, abbr):
    project = RentalProject.objects.get(abbreviation=abbr)
    project_rooms = project.rental_rooms.all().order_by("room")
    ms_clients = project.ms_clients.all()

    if request.method == "POST" and "add_edit" in request.POST:
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
                return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"abbr":project.abbreviation}))
            except:
                ClientMediaShuttle.objects.create(
                    project_client=project_client,
                    project_room=project_room,
                    project=project,
                    client_ms=client_ms
                )
                return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"abbr":project.abbreviation}))

    elif request.method == "POST" and "delete" in request.POST:
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
            return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"abbr":project.abbreviation}))

    
    form = ClientMediaShuttleForm(project=project)
    context_dict = {
        "project":project,
        "project_rooms":project_rooms,
        "ms_clients":ms_clients,
        "form":form,
    }


    return render(request, 'project_clients_ms_list.html', context_dict)


@login_required
def project_client_detail(request, abbr, pk):
    project = RentalProject.objects.get(abbreviation=abbr)
    project_client = ProjectClient.objects.get(pk=pk)
    client_ms = project_client.ms_rooms.filter(project=project)

    if request.method == "POST" and "new" in request.POST:
        notes_form = ProjectClientNotesForm(request.POST)
        if notes_form.is_valid():
            project_client.notes = notes_form.cleaned_data["notes"]
            project_client.save()
            # notes_form.save()

            return HttpResponseRedirect(reverse('project_clients:project_client_detail', kwargs={"abbr":project.abbreviation, "pk":project_client.pk}))

    elif request.method == "POST" and "update" in request.POST:
        notes_form = ProjectClientNotesForm(request.POST, instance=project_client)
        if notes_form.is_valid():
            # project_client.notes = notes_form.cleaned_data["notes"]
            # project_client.save()
            notes_form.save()

            return HttpResponseRedirect(reverse('project_clients:project_client_detail', kwargs={"abbr":project.abbreviation, "pk":project_client.pk}))

    elif request.method == "POST" and "remove" in request.POST:
        project_client.notes = None
        project_client.save()

        return HttpResponseRedirect(reverse('project_clients:project_client_detail', kwargs={"abbr":project.abbreviation, "pk":project_client.pk}))

    if project_client.notes:
        notes_form = ProjectClientNotesForm(instance = project_client)
    else:
        notes_form = ProjectClientNotesForm()


    context_dict = {
        'project': project,
        'project_client': project_client,
        'client_ms': client_ms,
        'notes_form': notes_form,
    }

    return render(request, 'project_client_detail.html', context_dict)