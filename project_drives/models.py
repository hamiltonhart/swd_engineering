from django.db import models


class ProjectDrive(models.Model):
    project = models.ForeignKey('rental_projects.RentalProject',
                                on_delete=models.CASCADE, related_name='rental_drives')
    drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE,
                              related_name='rental_projects', limit_choices_to={'rental_projects': None})
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{str(self.project)} - {str(self.drive)}'

    class Meta:
        unique_together = (('project', 'drive'))
