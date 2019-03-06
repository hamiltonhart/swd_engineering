from django.db import models
from django.db.models import Q

from django.urls import reverse


class RentalDriveQueryset(models.query.QuerySet):
    def available(self):
        return self.filter(Q(rental_project=None))

    def unavailable(self):
        return self.filter(~Q(rental_project=None))


class RentalDriveManager(models.Manager):
    def get_queryset(self):
        return RentalDriveQueryset(self.model, using=self._db)

    def available(self):
        return self.get_queryset().available()

    def unavailable(self):
        return self.get_queryset().unavailable()


class RentalDrive(models.Model):
    DRIVE_CAPACITY_CHOICES = (
        ('250GB', '250GB'),
        ('500GB', '500GB'),
        ('1TB', '1TB'),
        ('2TB', '2TB'),
        ('3TB', '3TB')
    )

    drive_number = models.IntegerField(unique=True, verbose_name="Drive Number")
    drive_capacity_gb = models.CharField(max_length=10, choices=DRIVE_CAPACITY_CHOICES, verbose_name="Drive Capacity")

    objects = RentalDriveManager()

    def __str__(self):
        return str(f'{self.drive_number}: {self.drive_capacity_gb}')

    def get_absolute_url(self):
        return reverse("harddrives:harddrives_detail", kwargs={"pk": self.pk})
    

