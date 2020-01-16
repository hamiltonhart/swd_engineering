from django.shortcuts import render, HttpResponseRedirect, reverse
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin


# class HomePageView(LoginRequiredMixin, TemplateView):
#     template_name = 'home.html'

from contacts.models import Contact
from rental_projects.models import RentalProject
from harddrives.models import RentalDrive

@login_required
def home_page_view(request):
    current_projects = RentalProject.objects.current()
    twofifty = RentalDrive.objects.twofifty_available()
    fivehundred = RentalDrive.objects.fivehundred_available()
    onetb = RentalDrive.objects.onetb_available()
    twotb = RentalDrive.objects.twotb_available()
    # threetb = RentalDrive.objects.threetb_available()

    context_dict = {
        "current_projects":current_projects,
        'twofifty': twofifty,
        'fivehundred': fivehundred,
        'onetb': onetb,
        'twotb': twotb,
    }

    return render(request, 'home.html', context_dict)