from django.db import models
from django.core.validators import RegexValidator
from django.urls import reverse


class Contact(models.Model):
    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, blank=True)
    company = models.CharField(max_length=200, blank=True)
    title = models.CharField(max_length=200, blank=True)
    # files = models.FileField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse("contacts:contacts_detail", kwargs={"pk": self.pk})
    
