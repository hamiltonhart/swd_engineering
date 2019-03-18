from django import forms

from .models import ProjectClient, ClientMediaShuttle


class ProjectClientForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = ["client", "client_role"]
        # widgets = {
        #     "client": forms.ModelChoiceField(
        #         queryset="contacts.Contact".objects.all().order_by('first_name'), 
        #         attrs={'placeholder': '-- Client --'}
        #         ),
        #     "client_role": forms.ChoiceField(attrs={'placeholder': '-- Client Role --'}),
        # }


    def __init__(self, *args, **kwargs):
        super(ProjectClientForm, self).__init__(*args, **kwargs)
        self.fields["client"].queryset = self.fields["client"].queryset.order_by('first_name')


class ProjectClientDeleteForm(forms.ModelForm):
    class Meta:
        model = ProjectClient
        fields = []

class ClientMediaShuttleForm(forms.ModelForm):
    class Meta:
        model = ClientMediaShuttle
        fields = [
            "project_client",
            "client_ms",
        ]