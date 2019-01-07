from django.db import models


class ProjectDrive(models.Model):
    backed_up = models.BooleanField(default=False)
    erased = models.BooleanField(default=False)

    class Meta:
        abstract = True


class FeatureProjectDrive(ProjectDrive):
    project = models.ForeignKey('rental_projects.Feature', on_delete=models.CASCADE, related_name='feature_drives')
    drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE, related_name='feature_project')

    def __str__(self):
        return self.drive

    class Meta:
        unique_together = (('project', 'drive'))


class SeriesProjectDrive(ProjectDrive):
    project = models.ForeignKey('rental_projects.Series', on_delete=models.CASCADE, related_name='series_drives')
    drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE, related_name='series_project')

    def __str__(self):
        return self.drive

    class Meta:
        unique_together = (('project', 'drive'))    
