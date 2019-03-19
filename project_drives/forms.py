from django import forms

from .models import ProjectDrive


class ProjectDriveForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ProjectDriveForm, self).__init__(*args, **kwargs)
        self.fields["drive"].queryset = self.fields["drive"].queryset.order_by(
            'drive_number')

    class Meta:
        model = ProjectDrive
        fields = ["drive"]
