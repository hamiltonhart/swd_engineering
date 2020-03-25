from django.db import models
from django.core.validators import RegexValidator
from django.urls import reverse
import phonenumbers
import re


class Contact(models.Model):
    COUNTRIES = (
        ("US", "US"),
        ("CA", "CA"),
        ("GB", "UK"),
    )

    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    email = models.EmailField(unique=True, blank=True,
                              null=True, verbose_name="Email")
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, blank=True, null=True, verbose_name="Phone")
    country = models.CharField(max_length=10, choices=COUNTRIES, default="US")
    company = models.CharField(max_length=200, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True,
                             null=True, verbose_name="Job Description")
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_absolute_url(self):
        return reverse("contacts:contacts_detail", kwargs={"pk": self.pk})

    def phone_format(self):
        parsed_number = phonenumbers.parse(self.phone_number, self.country)
        if self.country == "US":
            return phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.NATIONAL)
        else:
            return phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL)

    @property
    def last_project(self):
        try:
            project = self.rental_projects.reverse()
            return project[0].project
        except:
            pass
            return

    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'

    def save(self, *args, **kwargs):
        remove_chars = (" ", "-", "(", ")", "&")
        if self.email == "":
            self.email = None
        # if self.notes == "":
        #     self.notes = None
        if self.company == "":
            self.company = None
        if self.title == "":
            self.title = None
        if self.phone_number:
            for item in remove_chars:
                self.phone_number = self.phone_number.replace(item, "")
            print(f"Phone Number: {self.phone_number}")
        elif self.phone_number == "":
            self.phoneNumber = None
        super().save(*args, **kwargs)
