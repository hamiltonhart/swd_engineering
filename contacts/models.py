from django.db import models
from django.core.validators import RegexValidator
from django.urls import reverse
import phonenumbers


class Contact(models.Model):
    COUNTRIES = (
        ("US", "US"),
        ("CA", "CA"),
        ("GB", "UK"),
    )

    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    first_name = models.CharField(max_length=50, verbose_name="First Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    email = models.EmailField(unique=True, blank=True, null=True, verbose_name="Email")
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, blank=True, null=True, verbose_name="Phone")
    country = models.CharField(max_length=10, choices=COUNTRIES, default="US")
    company = models.CharField(max_length=200, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True, verbose_name="Job Description")
    notes = models.TextField(blank=True)

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
            project =  self.rental_projects.reverse()
            return project[0].project
        except:
            pass
            return

    def save(self, *args, **kwargs):
        # self.first_name = str(self.first_name).capitalize()
        # self.last_name = str(self.last_name).capitalize()
        if self.title:
            self.title = str(self.title).capitalize()
        if self.phone_number:
            self.phone_number = self.phone_number.replace("-", "")
            self.phone_number = self.phone_number.replace(" ", "")
        super().save(*args, **kwargs)
    
