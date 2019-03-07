from django.db import models
from django.contrib.postgres.fields import ArrayField

class Room(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name", unique=True)
    media_shuttle_connection_ip = models.CharField(max_length=50, default="10.254.129.250")
    media_shuttle_subnet = models.CharField(max_length=50, default="255.255.255.240")
    media_shuttle_network_ip = models.CharField(max_length=50, default="10.254.129.")
    media_shuttle_host_options = ArrayField(models.CharField(max_length=10), default=list)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = str(self.name).capitalize()
        super().save(*args, **kwargs)
