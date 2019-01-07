from django.db import models


class Plugin(models.Model):
    PLUGIN_TYPE_CHOICES = (
        ('AAX', 'AAX'),
        ('Waves', 'Waves'),
        ('VST', 'VST'),
        ('VST3', 'VST3'),
        ('AU', 'AU'),
    )

    manufacturer = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    vers = models.FloatField()
    plugin_type = models.CharField(max_length=50, choices=PLUGIN_TYPE_CHOICES)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}:  {self.vers}'

    def archive(self):
        self.archived = True
        self.save()