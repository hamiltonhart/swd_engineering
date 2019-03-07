from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.urls import reverse



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

    ROOM_CHOICES = (
        ("Stage 2", "Stage 2"),
        ("Stage 3", "Stage 3"),
        ("Stage 4", "Stage 4"),
        ("Stage 5", "Stage 5"),
        ("Stage 6", "Stage 6"),
        ("Stage 7", "Stage 7"),
        ("Bay 9", "Bay 9"),
        ("Bay 14", "Bay 14"),
    )

    title = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=50, blank=True)

    season = models.IntegerField(blank=True, null=True)

    protools_vers = models.FloatField(default=18.4, verbose_name="ProTools Version")

    number_of_systems = models.IntegerField(blank=True, null=True, verbose_name="Number of Systems")
    drive_user = models.CharField(max_length=50, blank=True, verbose_name='Drive Username')
    drive_pass = models.CharField(max_length=50, blank=True, verbose_name='Drive Password')
    ms_user = models.CharField(max_length=50, blank=True, verbose_name='Media Shuttle Username')
    ms_pass = models.CharField(max_length=50, blank=True, verbose_name='Media Shuttle Password')

    channel_config = models.CharField(max_length=200, choices=CHANNEL_CONFIG_CHOICES, default="5.1", verbose_name='Channel Configuration')
    # room = models.CharField(max_length=100, choices=ROOM_CHOICES, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True, verbose_name='Other Information')
    # files
    
    start_date = models.DateField(default=timezone.now())
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

    def __str__(self):
        if self.season:
            return f'{self.title}: Season {self.season}'
        else:
            return self.title

    def get_absolute_url(self):
        return reverse("rental_projects:rental_projects_detail", kwargs={"pk": self.pk})
    

    def mixing_completed(self):
        self.mixing_complete_date = timezone.now()
        self.mixing_completed_by = get_user_model()
        self.save()

    def backup(self):
        self.project_complete_date = timezone.now()
        self.project_complete_by = get_user_model()
        self.number_of_systems = len(self.rental_drives.all())
        for drive in self.rental_drives.all():
            drive.delete()

    def save(self, *args, **kwargs):
        self.title = str(self.title).capitalize()
        if not self.abbreviation:
            self.abbreviation = str(self.title).lower().strip()
        if not self.drive_user:
            self.drive_user = self.abbreviation
        if not self.drive_pass:
            self.drive_pass = self.abbreviation
        if not self.ms_user:
            self.ms_user = self.abbreviation
        if not self.ms_pass:
            self.ms_pass = self.abbreviation
        super().save(*args, **kwargs)

    class Meta:
        unique_together = (("title", "season", "abbreviation", "drive_user", "drive_pass", "ms_user", "ms_pass"))
