from django.db import models


class Contact(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    # phone_number
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