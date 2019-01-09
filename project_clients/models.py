from django.db import models
from django.db.models import Q


class ProjectClientQueryset(models.query.QuerySet):
    def mixers(self):
        return self.filter(Q(client_role='DX') | Q(client_role='MX') | Q(client_role='DXMX') | Q(client_role='FX'))
    
    def recordists(self):
        return self.filter(client_role='REC')

    def other_clients(self):
        return self.filter(client_role='Misc')


class ProjectClientManager(models.Manager):
    def get_queryset(self):
        return ProjectClientQueryset(self.model, using=self._db)

    def mixers(self):
        return self.get_queryset().mixers()

    def recordists(self):
        return self.get_queryset().recordists()

    def other_clients(self):
        return self.get_queryset().other_clients()


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

    objects = ProjectClientManager()

    class Meta:
        abstract = True


class FeatureClient(ProjectClient):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='feature_projects')
    project = models.ForeignKey('rental_projects.Feature', on_delete=models.CASCADE, related_name='feature_clients')

    def __str__(self):
        return str(self.client)

    class Meta:
        unique_together = (('client', 'project'))


class SeriesClient(ProjectClient):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='series_projects')
    project = models.ForeignKey('rental_projects.Series', on_delete=models.CASCADE, related_name='series_clients')

    def __str__(self):
        return str(self.client)

    class Meta:
        unique_together = (('client', 'project'))
