from django.db import models


class ProjectPlugin(models.Model):
    client_license = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def set_client_supplied(self):
        self.client_license = True
        self.save()

    def set_facility_supplied(self):
        self.client_license = False
        self.save()

    def archive(self):
        self.archived = True
        self.save()

    def unarchive(self):
        self.archived = False
        self.save()

    class Meta:
        abstract = True


class FeatureProjectPlugin(ProjectPlugin):
    project = models.ForeignKey("rental_projects.Feature", on_delete=models.CASCADE, related_name='feature_plugins')
    plugin = models.ForeignKey("plugins.Plugin", on_delete=models.CASCADE, related_name='feature_projects')

    def __str__(self):
        return self.plugin

    class Meta:
        unique_together = (('project', 'plugin'))


class SeriesPlugin(ProjectPlugin):
    project = models.ForeignKey("rental_projects.Series", on_delete=models.CASCADE, related_name='series_plugins')
    plugin = models.ForeignKey("plugins.Plugin", on_delete=models.CASCADE, related_name='series_projects')

    def __str__(self):
        return self.plugin
    
    class Meta:
        unique_together = (('project', 'plugin'))
