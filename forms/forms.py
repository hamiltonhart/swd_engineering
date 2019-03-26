from django import forms

class SimpleSearchForm(forms.Form):
    search_field = forms.CharField(label="Search", max_length=50, required=False)
