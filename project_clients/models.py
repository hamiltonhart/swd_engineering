from django.db import models


class ProjectClient(models.Model):
    CLIENT_ROLE_CHOICES = (
        ('DX', 'DX Mixer'),
        ('MX', 'MX Mixer'),
        ('DXMX', 'DX/MX Mixer'),
        ('FX', 'FX Mixer'),
        ('REC', 'Recordist'),
        ('Misc', 'Other'),
    )

    client_role = models.CharField(max_length=20, choices=CLIENT_ROLE_CHOICES, blank=True, null=True)

    class Meta:
        abstract = True


class FeatureClient(ProjectClient):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='feature_projects')
    project = models.ForeignKey('rental_projects.Feature', on_delete=models.CASCADE, related_name='feature_clients')

    def __str__(self):
        return self.client

    class Meta:
        unique_together = (('client', 'project'))


class SeriesClient(ProjectClient):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='series_projects')
    project = models.ForeignKey('rental_projects.Feature', on_delete=models.CASCADE, related_name='series_clients')

    def __str__(self):
        return self.client

    class Meta:
        unique_together = (('client', 'project'))
