from django.db import models


class ProjectDrive(models.Model):
    project = models.ForeignKey('rental_projects.RentalProject', on_delete=models.CASCADE, related_name='rental_drives')
    drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE, related_name='rental_project')
    backed_up = models.BooleanField(default=False)
    erased = models.BooleanField(default=False)

    def backup(self):
        self.backed_up = True
        self.save()

    def unbackup(self):
        self.backed_up = False
        self.save()

    def erase(self):
        self.erased = True
        self.save()

    def unerase(self):
        self.erased = False
        self.save()
    
    class Meta:
        unique_together = (('project', 'drive'))
        # abstract = True


# class FeatureProjectDrive(ProjectDrive):
#     project = models.ForeignKey('rental_projects.Feature', on_delete=models.CASCADE, related_name='feature_drives')
#     drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE, related_name='feature_project')

#     def __str__(self):
#         return str(self.drive)

#     class Meta:
#         unique_together = (('project', 'drive'))


# class SeriesProjectDrive(ProjectDrive):
#     project = models.ForeignKey('rental_projects.Series', on_delete=models.CASCADE, related_name='series_drives')
#     drive = models.ForeignKey('harddrives.RentalDrive', on_delete=models.CASCADE, related_name='series_project')

#     def __str__(self):
#         return str(self.drive)

#     class Meta:
#         unique_together = (('project', 'drive'))    
