from django.shortcuts import render, HttpResponseRedirect, HttpResponse
from django.urls import reverse, reverse_lazy
from django.views.generic import DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required


from .models import ProjectDrive
from .forms import ProjectDriveDeleteForm


class DeleteProjectDrive(LoginRequiredMixin, DeleteView):
    model = ProjectDrive
    context_object_name = "project_drive"
    template_name = "project_drives_delete.html"
    success_url = reverse_lazy("rental_projects:rental_projects_list", kwargs={"display_option":"all"})


@login_required
def delete_project_drive(request, pk):
    project_drive = ProjectDrive.objects.get(pk=pk)
    project_pk = project_drive.project.pk
    if request.method == "POST":
        form = ProjectDriveDeleteForm(request.POST)
        if form.is_valid():
            project_drive.delete()
            return HttpResponseRedirect(f"/rental_projects/{project_pk}")


    context_dict = {
        "project_drive": project_drive,
    }

    return render(request, "project_drives_delete.html", context_dict)


