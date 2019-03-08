from django import forms
from .models import RentalProject
from contacts.models import Contact

class RentalProjectForm(forms.ModelForm):
    # clients = forms.ModelMultipleChoiceField(queryset=Contact.objects.all(), widget=forms.Select())
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
            'clients',
            'rooms',
            'rental_drives',
            
        ]
        widgets = {
            # 'clients': forms.RadioSelect(),
            'season': forms.TextInput(),
            'protools_vers': forms.TextInput(),
        }