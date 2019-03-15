from django import forms
from .models import ProjectRoom


class ProjectRoomForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ProjectRoomForm, self).__init__(*args, **kwargs)
        self.fields["room"].queryset = self.fields["room"].queryset.order_by('name')

    class Meta:
        model = ProjectRoom
        fields = ['room']