from django.shortcuts import render, HttpResponseRedirect, reverse
from django.contrib.auth.decorators import login_required

from .models import ProjectRoom
from .forms import ProjectRoomForm, ProjectRoomAddEditRemoveForm

from rental_projects.models import RentalProject


@login_required
def manage_project_rooms(request, pk):
    project = RentalProject.objects.get(pk=pk)
    project_rooms = ProjectRoom.objects.filter(project=project).order_by("room")

    if request.POST and "add_edit" in request.POST:
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

    elif request.POST and "remove" in request.POST:
        form = ProjectRoomAddEditRemoveForm(request.POST)
        if form.is_valid():
            room = form.cleaned_data['room']
            try:
                project_room_delete = ProjectRoom.objects.get(room=room, project=project)
                project_room_delete.delete()
                return HttpResponseRedirect(reverse('project_rooms:project_rooms_add_edit', kwargs={'pk':project.pk}))
            except:
                return HttpResponseRedirect(reverse('project_rooms:project_rooms_add_edit', kwargs={'pk':project.pk}))

    form = ProjectRoomAddEditRemoveForm()
    
    context_dict = {
        "form":form,
        "project":project,
        "project_rooms":project_rooms,
    }

    return render(request, "project_rooms_add_edit.html", context_dict)



