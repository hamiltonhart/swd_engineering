from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth.decorators import login_required

from .models import ProjectClient, ClientMediaShuttle

from rental_projects.models import RentalProject


# Class views


# Function Views

@login_required
def project_client_ms_list(request, pk):
    project = RentalProject.objects.get(pk=pk)
    project_clients = ProjectClient.objects.all()
    project_client_ms = ClientMediaShuttle.objects.all()
    
    context_dict = {
        "project":project,
        "project_client":project_clients,
        "project_client_ms":project_client_ms,
    }
    

    return render(request, 'project_clients_list.html', context_dict)



