from django import forms
from .models import RentalProject
from contacts.models import Contact

from swd_engineering_project.settings import base

import datetime


class RentalProjectForm(forms.ModelForm):
    # clients = forms.ModelMultipleChoiceField(
    #     queryset=Contact.objects.all(), widget=forms.Select())
    today = datetime.date.today()
    start_date = forms.DateField(
        widget=forms.DateInput(format='%m-%d-%Y'),
        required=False,
        input_formats=('%m-%d-%Y', '%Y-%m-%d'),
        initial=str(datetime.date.today().strftime('%m-%d-%Y'),
        ),
    )

    class Meta:
        model = RentalProject
        fields = [
            'title',
            'season',
            'abbreviation',
            'protools_vers',
            'drive_user',
            'drive_pass',
            'ms_user',
            'ms_pass',
            'channel_config',
            'files_link',
            'start_date',
            'additional_info',
        ]
        widgets = {
            'season': forms.TextInput(),
            'protools_vers': forms.TextInput(),
        }

class RentalProjectQuickForm(forms.ModelForm):
    class Meta:
        model = RentalProject
        fields = [
            'title',
            'season',
            'abbreviation',
            'protools_vers',
            'files_link',
        ]
        widgets = {
            'title': forms.TextInput(attrs={'placeholder':"Title"}),
            'season': forms.TextInput(attrs={'placeholder':"Season"}),
            'abbreviation': forms.TextInput(attrs={'placeholder':"Abbreviation"}),
            'protools_vers': forms.TextInput(attrs={'placeholder':"PT Vers"}),
            'files_link': forms.TextInput(attrs={'placeholder':"GoogleDrive"}),
        }


class RentalProjectCompletedForm(forms.ModelForm):
    class Meta:
        model = RentalProject
        fields = []


class RentalProjectBackupForm(forms.ModelForm):
    class Meta:
        model = RentalProject
        fields = []
