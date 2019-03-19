from django.db import models
from django.contrib.postgres.fields import ArrayField

class Room(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name", unique=True)
    notes = models.TextField(blank=True, null=True, verbose_name="Notes")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.name = str(self.name).capitalize()
        super().save(*args, **kwargs)


class Stage(Room):
    media_shuttle_connection_ip = models.CharField(max_length=50, default="10.254.129.250", verbose_name="Connection IP")
    media_shuttle_subnet = models.CharField(max_length=50, default="255.255.255.240", verbose_name="Subnet Mask")
    media_shuttle_host = models.CharField(max_length=50, default="10.254.129.xxx", verbose_name="Host IP")
    media_shuttle_ip_range = models.CharField(max_length=50, verbose_name="IP Range")    


class BasicRoom(Room):
    pass