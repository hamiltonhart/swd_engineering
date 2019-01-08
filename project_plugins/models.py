from django.db import models


class ProjectPluginQueryset(models.query.QuerySet):
    def client_supplied(self):
        return self.filter(client_license=True)

    def facility_supplied(self):
        return self.filter(client_license=False)


class ProjectPluginManager(models.Manager):
    def get_queryset(self):
        return ProjectPluginQueryset(self.model, using=self._db)

    def client_supplied(self):
        return self.get_queryset().client_supplied()

    def facility_supplied(self):
        return self.get_queryset().facility_supplied()


class ProjectPlugin(models.Model):
    client_license = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def set_client_supplied(self):
        self.client_license = True
        self.save()

    def set_facility_supplied(self):
        self.client_license = False
        self.save()

    def set_archive(self):
        self.archived = True
        self.save()

    def set_unarchive(self):
        self.archived = False
        self.save()

    class Meta:
        abstract = True


class FeatureProjectPlugin(ProjectPlugin):
    project = models.ForeignKey("rental_projects.Feature", on_delete=models.CASCADE, related_name='feature_plugins')
    plugin = models.ForeignKey("plugins.Plugin", on_delete=models.CASCADE, related_name='feature_projects')

    def __str__(self):
        return str(self.plugin)

    class Meta:
        unique_together = (('project', 'plugin'))


class SeriesPlugin(ProjectPlugin):
    project = models.ForeignKey("rental_projects.Series", on_delete=models.CASCADE, related_name='series_plugins')
    plugin = models.ForeignKey("plugins.Plugin", on_delete=models.CASCADE, related_name='series_projects')

    def __str__(self):
        return str(self.plugin)
    
    class Meta:
        unique_together = (('project', 'plugin'))
