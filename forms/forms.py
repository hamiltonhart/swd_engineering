from django import forms

class SimpleSearchForm(forms.Form):
    search_field = forms.CharField(label="Search", max_length=50, required=False)

class FilterSearchForm(forms.Form):
    search_field = forms.CharField(
        label="Search", 
        max_length=50, 
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Search',
            'autocomplete': 'off'})
        )
    status_field = forms.ChoiceField(label="Status", choices=[
        ("0", "All"),
        ("1", "Current"),
        ("2", "Mixing Complete"),
        ("3", "Erased")
    ])
    channel_config_field = forms.ChoiceField(label="Config",choices=[
        ("0", "All"),
        ("1", "Stereo"),
        ("2", "5.1"),
        ("3", "7.1"),
        ("4", "ATMOS"),
        ("5", "DTS"),
        ("6", "IMAX 6"),
        ("7", "IMAX 12")
    ])
    type_field = forms.ChoiceField(label="Show Type",choices=[
        ("0", "All"),
        ("1", "Features"),
        ("2", "Series")
    ])

class ContactSortSearchForm(forms.Form):
    search_field = forms.CharField(
        label="Search", 
        max_length=50, 
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Search',
            'autocomplete': 'off'})
        )
    name_sorting = forms.ChoiceField(label="Sorting", choices=[
        ("0", "First Name"),
        ("1", "Last Name")
    ])