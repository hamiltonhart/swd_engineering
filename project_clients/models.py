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
        ('DX Mixer', 'DX Mixer'),
        ('MX Mixer', 'MX Mixer'),
        ('DX/MX Mixer', 'DX/MX Mixer'),
        ('FX Mixer', 'FX Mixer'),
        ('Recordist', 'Recordist'),
        ('Other', 'Other'),
    )

    client = models.ForeignKey('contacts.Contact', on_delete=models.CASCADE, related_name='rental_projects')
    project = models.ForeignKey('rental_projects.RentalProject', on_delete=models.CASCADE, related_name='rental_clients')
    client_role = models.CharField(max_length=20, choices=CLIENT_ROLE_CHOICES, blank=True, null=True)

    objects = ProjectClientManager()

    def __str__(self):
        return f'{str(self.client)} - {str(self.project)}'

    class Meta:
        unique_together = (('client', 'project'))


class ClientMediaShuttle(models.Model):
    project_client = models.ForeignKey(ProjectClient, on_delete=models.CASCADE, related_name="media_shuttle_ips")
    client_ms = models.CharField(max_length=10)

    def __str__(self):
        return f'{str(self.project_client)} - {self.client_ms}'