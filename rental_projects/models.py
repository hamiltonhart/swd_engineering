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

    title = models.CharField(max_length=200, unique=True)
    abbreviation = models.CharField(max_length=50, unique=True)

    protools_vers = models.FloatField(default=12.4)
    dolby_techs = models.ManyToManyField('contacts.Vendor', limit_choices_to={"company": "Dolby"})

    number_of_systems = models.IntegerField(default=4, blank=True, null=True)
    drive_user = models.CharField(max_length=50,unique=True, blank=True, null=True)
    drive_pass = models.CharField(max_length=50,unique=True, blank=True, null=True)
    ms_user = models.CharField(max_length=50,unique=True, blank=True, null=True)
    ms_pass = models.CharField(max_length=50,unique=True, blank=True, null=True)

    channel_config = models.CharField(max_length=200, choices=CHANNEL_CONFIG_CHOICES, blank=True, null=True)
    room = models.CharField(max_length=100)
    additional_info = models.TextField(blank=True, null=True)
    # files
    
    start_date = models.DateTimeField(default=timezone.now())
    mixing_complete_date = models.DateTimeField(null=True)
    project_complete_date = models.DateTimeField(null=True)
    

    def mixing_completed(self):
        self.mixing_complete_date = timezone.now()
        self.mixing_completed_by = get_user_model()
        self.save()

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
