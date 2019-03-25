from django import forms

from .models import ProjectClient, ClientMediaShuttle


class ProjectClientForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = ["client", "client_role"]

    def __init__(self, *args, **kwargs):
        super(ProjectClientForm, self).__init__(*args, **kwargs)
        self.fields["client"].queryset = self.fields["client"].queryset.order_by(
            'first_name')


class ProjectClientDeleteForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = []


class ClientMediaShuttleForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        project = kwargs.pop('project')
        super(ClientMediaShuttleForm, self).__init__(*args, **kwargs)
        self.fields["project_client"].queryset = self.fields["project_client"].queryset.filter(project=project).order_by(
            'client')

    class Meta:
        model = ClientMediaShuttle
        fields = [
            "project_client",
            "client_ms",
        ]
