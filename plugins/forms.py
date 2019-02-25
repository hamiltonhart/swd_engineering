from django import forms
from .models import Plugin

class PluginForm(forms.ModelForm):
    class Meta:
        model = Plugin
        fields = [
            'manufacturer',
            'name',
            'vers',
            'plugin_type',
        ]