from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from . import models

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = models.CustomUser
        fields = UserCreationForm.Meta.fields

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = models.CustomUser
        fields = UserChangeForm.Meta.fields
        