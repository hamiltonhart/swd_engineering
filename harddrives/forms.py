from django import forms
from .models import RentalDrive

class RentalDriveForm(forms.ModelForm):
    class Meta:
        model = RentalDrive
        fields = [
            'drive_number',
            'drive_capacity_gb',
        ]
        widgets = {
            'drive_number': forms.TextInput(),
        }

