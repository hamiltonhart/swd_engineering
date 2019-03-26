from django import forms
from .models import RentalProject
from contacts.models import Contact

from swd_engineering_project import settings

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
    # month = forms.DateField(
    #     widget=forms.DateInput(format='%m'),
    #     input_formats=('%m', ),
    #     initial=f'{str(today.strftime("%m"))}',
    # )

    # day = forms.DateField(
    #     widget=forms.DateInput(format='%d'),
    #     input_formats=('%d', ),
    #     initial=f'{str(today.strftime("%d"))} ',
    # )

    # year = forms.DateField(
    #     widget=forms.DateInput(format='%Y'),
    #     input_formats=('%Y', ),
    #     initial=f'{str(today.strftime("%Y"))} ',
    # )

    # forms.DateField(
    #     widget=forms.DateInput(format='%m/%d/%Y'),
    #     input_formats=('%m%d%Y', )
    #     )

    # def clean_date(self):
    #     year = self.cleaned_data['year']
    #     month = self.cleaned_data['month']
    #     day = self.cleaned_data['day']
    #     date_info = [year, month, day]
    #     for x in date_info:
    #         date_info.pop(x)
    #         if x[0] == "0":
    #             try:
    #                 date_info.append(int(x[1:]))
    #             except:
    #                 raise forms.ValidationError("Must enter only numbers for the date.")

    #         else:
    #             try:
    #                 date_info.append(int(x))
    #             except:
    #                 raise forms.ValidationError("Must enter only numbers for the date.")
    #     start_date = datetime.date(date_info[0], date_info[1], date_info[2])

    #     return start_date

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
