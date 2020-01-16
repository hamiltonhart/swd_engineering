from django import forms
from .models import Contact


class ContactsForm(forms.ModelForm):

    def clean_phone_number(self):
        phone_number = self.cleaned_data["phone_number"]
        if phone_number:
            phone_number = phone_number.replace(" ", "")
            phone_number = phone_number.replace("-", "")
        
        return phone_number

    class Meta:
        model = Contact
        fields = [
            'first_name',
            'last_name',
            'email',
            'country',
            'phone_number',
            'company',
            'title',
            'notes',
        ]


class ContactsShortForm(forms.ModelForm):

    def clean_phone_number(self):
        phone_number = self.cleaned_data["phone_number"]
        if phone_number:
            phone_number = phone_number.replace(" ", "")
            phone_number = phone_number.replace("-", "")
        
        return phone_number

    class Meta:
        model = Contact
        fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'company',
            'title',
        ]
