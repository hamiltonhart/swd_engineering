from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models, forms

class CustomUserAdmin(UserAdmin):
    add_form = forms.CustomUserCreationForm
    form = forms.CustomUserChangeForm
    model = models.CustomUser

admin.site.register(models.CustomUser, CustomUserAdmin)
