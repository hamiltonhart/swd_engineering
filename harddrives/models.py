from django.db import models
from django.db.models import Q

from django.urls import reverse


class RentalDriveQueryset(models.query.QuerySet):
    def available(self):
        return self.filter(Q(rental_projects=None))

    def unavailable(self):
        return self.filter(~Q(rental_projects=None))

    def twofifty_available(self):
        return self.filter(Q(rental_projects=None) & Q(drive_capacity_gb='250GB'))

    def fivehundred_available(self):
        return self.filter(Q(rental_projects=None) & Q(drive_capacity_gb='500GB'))

    def onetb_available(self):
        return self.filter(Q(rental_projects=None) & Q(drive_capacity_gb='1TB'))

    def twotb_available(self):
        return self.filter(Q(rental_projects=None) & Q(drive_capacity_gb='2TB'))

    def threetb_available(self):
        return self.filter(Q(rental_projects=None) & Q(drive_capacity_gb='3TB'))


class RentalDriveManager(models.Manager):
    def get_queryset(self):
        return RentalDriveQueryset(self.model, using=self._db)

    def available(self):
        return self.get_queryset().available()

    def unavailable(self):
        return self.get_queryset().unavailable()

    def twofifty_available(self):
        return self.get_queryset().twofifty_available()

    def fivehundred_available(self):
        return self.get_queryset().fivehundred_available()

    def onetb_available(self):
        return self.get_queryset().onetb_available()

    def twotb_available(self):
        return self.get_queryset().twotb_available()

    def threetb_available(self):
        return self.get_queryset().threetb_available()


class RentalDrive(models.Model):
    DRIVE_CAPACITY_CHOICES = (
        ('250GB', '250GB'),
        ('500GB', '500GB'),
        ('1TB', '1TB'),
        ('2TB', '2TB'),
        ('3TB', '3TB')
    )

    drive_number = models.IntegerField(
        unique=True, verbose_name="Drive Number")
    drive_capacity_gb = models.CharField(
        max_length=10, choices=DRIVE_CAPACITY_CHOICES, verbose_name="Drive Capacity")

    objects = RentalDriveManager()

    def __str__(self):
        return str(f'{self.drive_number}: {self.drive_capacity_gb}')

    def get_absolute_url(self):
        return reverse("harddrives:harddrives_detail", kwargs={"pk": self.pk})


def get_storage(self):
    tb_total = []
    gb_total = []
    for drive in RentalDrive.objects.all():
        if drive.drive.drive_capacity_gb.endswith('TB'):
            tb_total.append(int(drive.drive.drive_capacity_gb.strip('TB')))
        else:
            gb_total.append(
                int(drive.drive.drive_capacity_gb.strip('GB')) / 1000)
    if len(tb_total) > 0:
        tb_total = reduce(lambda a, b: a + b, tb_total)
    else:
        tb_total = 0
    if len(gb_total) > 0:
        gb_total = reduce(lambda a, b: a + b, gb_total)
        return tb_total + gb_total
    else:
        return tb_total
