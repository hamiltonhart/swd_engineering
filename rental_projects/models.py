from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone



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

    title = models.CharField(max_length=200, unique=True)
    abbreviation = models.CharField(max_length=50, unique=True)

    protools_vers = models.FloatField(default=12.4)

    number_of_systems = models.IntegerField(default=4, blank=True, null=True)
    drive_user = models.CharField(max_length=50,unique=True, blank=True, null=True)
    drive_pass = models.CharField(max_length=50,unique=True, blank=True, null=True)
    ms_user = models.CharField(max_length=50,unique=True, blank=True, null=True)
    ms_pass = models.CharField(max_length=50,unique=True, blank=True, null=True)

    channel_config = models.CharField(max_length=200, choices=CHANNEL_CONFIG_CHOICES, blank=True, null=True)
    room = models.CharField(max_length=100, choices=ROOM_CHOICES, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)
    # files
    
    start_date = models.DateTimeField(default=timezone.now())
    mixing_complete_date = models.DateTimeField(null=True)
    project_complete_date = models.DateTimeField(null=True)
    

    def mixing_completed(self):
        self.mixing_complete_date = timezone.now()
        self.mixing_completed_by = get_user_model()
        self.save()

    def save(self, *args, **kwargs):
        if self.abbreviation:
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
        abstract = True



class Feature(RentalProject):
    mixing_completed_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, default=None, related_name="feature_mixing_marked_completed")
    project_complete_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, default=None, related_name="feature_project_marked_completed")

    def __str__(self):
        return self.title


class Series(RentalProject):
    season = models.IntegerField()

    mixing_completed_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, default=None, related_name="series_mixing_marked_completed")
    project_complete_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, default=None, related_name="series_project_marked_completed")

    def __str__(self):
        return f'{self.title}: Season {str(self.season)}'

    class Meta:
        unique_together = (('title', 'season'))
