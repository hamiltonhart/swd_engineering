from django.db import models
from django.core.validators import RegexValidator



class Contact(models.Model):
    PHONE_REGEX = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(validators=[PHONE_REGEX], max_length=17, blank=True)
    notes = models.TextField()

    class Meta:
        abstract = True


class Client(Contact):
    # files = models.FileField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Vendor(Contact):
    company = models.CharField(max_length=200)
    title = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class OtherContact(Contact):

    def __str__(self):
        return f'{self.first_name} {self.last_name}'