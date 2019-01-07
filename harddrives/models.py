from django.db import models


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

    def __str__(self):
        return self.drive_number

