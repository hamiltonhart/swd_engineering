from django.shortcuts import render, HttpResponseRedirect, reverse
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, ListView, DetailView, UpdateView, DeleteView
from django.contrib.auth.decorators import login_required


from . import models
from .forms import RentalDriveForm

from project_drives.models import ProjectDrive


class DriveCreateView(LoginRequiredMixin, CreateView):
    model = models.RentalDrive
    template_name = "harddrives_new.html"
    form_class = RentalDriveForm

@login_required
def drive_list_view(request, display_option=None):
    """
    Hard Drive List:
    Lists harddrives based on filter selection.
    If search, it is applied to the overall filter.
    """

    # search_form = SimpleSearchForm()
    query_string = None

    all_drives = models.RentalDrive.objects.all().order_by("drive_number")
    available_drives = models.RentalDrive.objects.available().order_by("drive_number")
    unavailable_drives = models.RentalDrive.objects.unavailable().order_by("drive_number")
    new_drive_form = RentalDriveForm()

    if request.method =="POST": 
        if "new-drive" in request.POST:
            new_drive_form = RentalDriveForm(request.POST)
            if new_drive_form.is_valid():
                drive_number = new_drive_form.cleaned_data['drive_number']
                capacity = new_drive_form.cleaned_data['drive_capacity_gb']
                models.RentalDrive.objects.create(
                    drive_number=drive_number,
                    drive_capacity_gb=capacity
                )
                new_drive_form = RentalDriveForm()
        if "release-drive" in request.POST:
            project_drive_pk = request.POST['project-drive-pk']
            try:
                project_drive = ProjectDrive.objects.get(pk=project_drive_pk)
                project_drive.delete()
            except:
                pass
                


    if display_option == "all" or display_option == '':
        drive_list = all_drives
    elif display_option == "available":
        drive_list = available_drives
    elif display_option == "in-use":
        drive_list = unavailable_drives
    else:
        drive_list = models.RentalDrive.objects.filter(drive_capacity_gb=display_option)


    # if request.method == "GET" and 'search_field' in request.GET:
    #     if request.GET['search_field'] == '':
    #         search_form = SimpleSearchForm()
    #     else:
    #         query_string = request.GET['search_field']
    #         query = get_query(
    #             query_string, ['title', 'abbreviation', 'drive_user', 'ms_user'])
    #         projects_list = projects_list.filter(query).order_by('title')
    #         search_form = SimpleSearchForm()


    context_dict = {
        'all_drives': all_drives,
        'available_drives': available_drives,
        'unavailable_drives': unavailable_drives,
        'drive_list': drive_list,
        'next_drive': str(int(all_drives.order_by("-drive_number")[0].drive_number) + 1),
        'new_drive_form': new_drive_form,
        # 'search_form': search_form,
        # 'results': query_string,
    }

    return render(request, 'harddrives_list.html', context_dict)
    

@login_required
def drive_detail(request, pk):

    drive = models.RentalDrive.objects.get(pk=pk)

    if request.method == "POST":
        if 'delete-drive' in request.POST:
            drive.delete()
            return HttpResponseRedirect(reverse("harddrives:harddrives_list", kwargs={"display_option":"available"}))
        if "release-drive" in request.POST:
            project_drive_pk = request.POST['project-drive-pk']
            try:
                project_drive = ProjectDrive.objects.get(pk=project_drive_pk)
                project_drive.delete()
            except:
                pass


    context_dict = {
        "drive": drive,
    }
    return render(request, 'harddrives_detail.html', context_dict)


class DriveUpdateView(LoginRequiredMixin, UpdateView):
    model = models.RentalDrive
    template_name = "harddrives_update.html"
    context_object_name = "drive"
    form_class = RentalDriveForm


class DriveDeleteView(LoginRequiredMixin, DeleteView):
    model = models.RentalDrive
    context_object_name = "drive"
    template_name = "harddrives_delete.html"
    success_url = reverse_lazy("harddrives:harddrives_list", kwargs={"display_option":"all"})


@login_required
def drive_redirect_list_view(request):
    return HttpResponseRedirect(reverse('harddrives:harddrives_list', kwargs={'display_option': 'available'}))
