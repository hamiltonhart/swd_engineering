from django import forms

from .models import ProjectClient


class ProjectClientForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = ["client", "client_role"]

    def __init__(self, *args, **kwargs):
        super(ProjectClientForm, self).__init__(*args, **kwargs)
        self.fields["client"].queryset = self.fields["client"].queryset.order_by('first_name')


class ProjectClientDeleteForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = []