from django.db import models
from django.db.models import Q


class RentalDriveQueryset(models.query.QuerySet):
    def available(self):
        return self.filter(Q(feature_project=None) & Q(series_project=None))

    def unavailable(self):
        return self.filter(~Q(feature_project=None) | ~Q(series_project=None))


class RentalDriveManager(models.Manager):
    def get_queryset(self):
        return RentalDriveQueryset(self.model, using=self._db)

    def available(self):
        return self.get_queryset().available()

    def unavailable(self):
        return self.get_queryset().unavailable()


class RentalDrive(models.Model):
    DRIVE_CAPACITY_CHOICES = (
        (250, '250GB'),
        (500, '500GB'),
        (1000, '1TB'),
        (2000, '2TB'),
        (3000, '3TB')
    )

    drive_number = models.IntegerField(unique=True)
    drive_capacity_gb = models.IntegerField(choices=DRIVE_CAPACITY_CHOICES)

    objects = RentalDriveManager()

    def __str__(self):
        return str(self.drive_number)

