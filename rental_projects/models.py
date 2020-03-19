from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.urls import reverse
from django.db.models import Q

from functools import reduce

import datetime

class RentalProjectQueryset(models.query.QuerySet):
    # def available(self):
    #     return self.filter(Q(rental_projects=None))

    # def unavailable(self):
    #     return self.filter(~Q(rental_projects=None))

    # return self.filter(Q(client_role='DX') | Q(client_role='MX') | Q(client_role='DXMX') | Q(client_role='FX'))

    def current(self):
        return self.filter(Q(mixing_complete_date=None) & Q(project_complete_date=None))
    
    def mixing_complete(self):
        return self.filter(~Q(mixing_complete_date=None) & Q(project_complete_date=None))
    
    def project_complete(self):
        return self.filter(~Q(mixing_complete_date=None) & ~Q(project_complete_date=None))


class RentalProjectManager(models.Manager):
    def get_queryset(self):
        return RentalProjectQueryset(self.model, using=self._db)

    def current(self):
        return self.get_queryset().current()

    def mixing_complete(self):
        return self.get_queryset().mixing_complete()

    def project_complete(self):
        return self.get_queryset().project_complete()


class RentalProject(models.Model):
    CHANNEL_CONFIG_CHOICES = (
        ("ST", "Stereo"),
        ("5.1", "5.1"),
        ("7.1", "7.1"),
        ("ATMOS", "ATMOS"),
        ("DTS", "DTS"),
        ("IMAX 6", "IMAX 6"),
        ("IMAX 12", "IMAX 12"),
    )

    title = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=50, blank=True, unique=True)

    season = models.IntegerField(blank=True, null=True)

    protools_vers = models.FloatField(verbose_name="ProTools Version")

    number_of_systems = models.IntegerField(blank=True, null=True, verbose_name="Number of Systems")
    drive_user = models.CharField(max_length=50, blank=True, verbose_name='Drive Username')
    drive_pass = models.CharField(max_length=50, blank=True, verbose_name='Drive Password')
    ms_user = models.CharField(max_length=50, blank=True, verbose_name='Media Shuttle Username')
    ms_pass = models.CharField(max_length=50, blank=True, verbose_name='Media Shuttle Password')

    files_link = models.URLField(blank=True, null=True, verbose_name="GoogleDrive Link")

    channel_config = models.CharField(max_length=200, choices=CHANNEL_CONFIG_CHOICES, default="5.1", verbose_name='Channel Configuration')

    additional_info = models.TextField(blank=True, null=True, verbose_name='Other Information')
    # files
    
    start_date = models.DateField(default=datetime.date.today, blank=True)
    mixing_complete_date = models.DateField(blank=True, null=True)
    project_complete_date = models.DateField(blank=True, null=True)

    mixing_completed_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        default=None,
        related_name="feature_mixing_marked_completed"
        )
    project_complete_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        default=None,
        related_name="feature_project_marked_completed"
        )

    objects = RentalProjectManager()

    def __str__(self):
        if self.season:
            return f'{self.title}: Season {self.season}'
        else:
            return self.title

    def get_absolute_url(self):
        return reverse("rental_projects:rental_projects_detail", kwargs={"abbr": self.abbreviation})
    
    def mixing_completed(self, user):
        self.mixing_complete_date = datetime.date.today()
        self.mixing_completed_by = user
        self.save()

    def mixing_incomplete(self):
        self.mixing_complete_date = None
        self.mixing_completed_by = None
        self.project_complete_by = None
        self.project_complete_date = None
        self.save()

    def backup(self, user):
        self.project_complete_date = datetime.date.today()
        self.project_complete_by = user
        self.number_of_systems = len(self.rental_drives.all())
        for drive in self.rental_drives.all():
            drive.delete()

        if not self.mixing_complete_date:
            self.mixing_completed(user)
        else:
            self.save()

    def set_primary_room(self, new_primary_id):
        try:
            current_primary = self.primary_room
            current_primary.primary_room = False
            current_primary.save()
        except:
            pass
        new_primary = self.rental_rooms.get(id=new_primary_id)
        new_primary.primary_room = True
        new_primary.save()

    def unset_primary_room(self):
        try:
            current_primary = self.primary_room
            current_primary.primary_room = False
            current_primary.save()
        except:
            return

    @property
    def total_drives(self):
        return len(self.rental_drives.all())

    @property
    def total_storage(self):
        tb_total = []
        gb_total = []
        for drive in self.rental_drives.all():
            if drive.drive.drive_capacity_gb.endswith('TB'):
                tb_total.append(int(drive.drive.drive_capacity_gb.strip('TB')))
            else:
                gb_total.append(int(drive.drive.drive_capacity_gb.strip('GB')) / 1000)
        if len(tb_total) > 0:
            tb_total = reduce(lambda a,b: a + b, tb_total)
        else:
            tb_total = 0
        if len(gb_total) > 0:
            gb_total = reduce(lambda a,b: a + b, gb_total)
            return tb_total + gb_total
        else:
            return f'{tb_total}TB'

    @property
    def is_mixing_complete(self):
        if self.mixing_complete_date:
            return True
        else:
            return False

    @property
    def is_project_complete(self):
        if self.project_complete_date:
            return True
        else:
            return False

    @property
    def primary_room(self):
        for room in self.rental_rooms.all():
            if room.primary_room:
                return room


    def save(self, *args, **kwargs):
        # self.title = str(self.title).title()
        if not self.abbreviation:
            abbr_title = str(self.title).lower().replace(" ", "")
            if self.season:
                abbr_season = str(self.season)
                self.abbreviation = abbr_title + abbr_season
            else:
                self.abbreviation = str(self.title).lower().replace(" ", "")
        if not self.drive_user:
            self.drive_user = str(self.abbreviation).lower().replace(" ", "")
        if not self.drive_pass:
            self.drive_pass = str(self.abbreviation).lower().replace(" ", "")
        if not self.ms_user:
            self.ms_user = str(self.abbreviation).lower().replace(" ", "")
        if not self.start_date:
            self.start_date = datetime.date.today()
        super().save(*args, **kwargs)

    class Meta:
        unique_together = (("title", "season", "abbreviation", "drive_user", "drive_pass", "ms_user", "ms_pass"))
