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
        input_formats=('%m-%d-%Y', '%Y-%m-%d'),
        initial=str(datetime.date.today().strftime('%m-%d-%Y')),
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
            'start_date',
            'additional_info',
        ]
        widgets = {
            'season': forms.TextInput(),
            'protools_vers': forms.TextInput(),
        }


class RentalProjectCompletedForm(forms.ModelForm):
    class Meta:
        model = RentalProject
        fields = []


class RentalProjectBackupForm(forms.ModelForm):
    class Meta:
        model = RentalProject
        fields = []
