from django.db import models
from django.core.validators import RegexValidator
from django.urls import reverse
import phonenumbers


class Contact(models.Model):
    COUNTRIES = (
        ("US", "US"),
        ("CA", "CANADA"),
        ("GB", "UK"),
    )

    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(
        validators=[PHONE_REGEX], max_length=17, blank=True, null=True)
    country_code = models.CharField(max_length=10, choices=COUNTRIES, default="US")
    company = models.CharField(max_length=200, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    # files = models.FileField()
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
    
