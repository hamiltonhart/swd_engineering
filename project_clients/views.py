from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required

from .models import ProjectClient, ClientMediaShuttle
from .forms import ClientMediaShuttleForm

from rental_projects.models import RentalProject
from project_rooms.models import ProjectRoom



# Class views


# Function Views

@login_required
def project_client_ms_list(request, pk):
    project = RentalProject.objects.get(pk=pk)
    project_rooms = project.rental_rooms.all()
    ms_clients = project.ms_clients.all()

    if request.method == "POST" and "add_edit" in request.POST:
        form = ClientMediaShuttleForm(request.POST)
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
                return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"pk":project.pk}))
            except:
                ClientMediaShuttle.objects.create(
                    project_client=project_client,
                    project_room=project_room,
                    project=project,
                    client_ms=client_ms
                )
                return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"pk":project.pk}))

    elif request.method == "POST" and "delete" in request.POST:
        form = ClientMediaShuttleForm(request.POST)
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
            return HttpResponseRedirect(reverse("project_clients:project_clients_ms_list", kwargs={"pk":project.pk}))



    
    form = ClientMediaShuttleForm()
    context_dict = {
        "project":project,
        "project_rooms":project_rooms,
        "ms_clients":ms_clients,
        "form":form,
    }


    return render(request, 'project_clients_ms_list.html', context_dict)


# if request.method=='POST' and 'btnform1' in request.POST:
#     do something...
# if request.method=='POST' and 'btnform2' in request.POST:
#     do something...

# get_or_create