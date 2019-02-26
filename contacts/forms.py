from django import forms
from .models import Contact


class ContactsForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'company',
            'title', 'notes'
        ]
