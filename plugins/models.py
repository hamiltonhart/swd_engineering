from django.db import models


class PluginQueryset(models.query.QuerySet):
    def aax(self):
        return self.filter(plugin_type="AAX")
    
    def waves(self):
        return self.filter(plugin_type="Waves")

    def vst(self):
        return self.filter(plugin_type="VST")

    def vst3(self):
        return self.filter(plugin_type="VST3")

    def audio_units(self):
        return self.filter(plugin_type="AU")

    
class PluginManager(models.Manager):
    def get_queryset(self):
        return PluginQueryset(self.model, using=self._db)

    def aax(self):
        return self.get_queryset().aax()

    def waves(self):
        return self.get_queryset().waves()

    def vst(self):
        return self.get_queryset().vst()

    def vst3(self):
        return self.get_queryset().vst3()

    def audio_units(self):
        return self.get_queryset().audio_units()


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

    objects = PluginManager()

    def __str__(self):
        return f'{self.name}: {self.vers}'

    def archive(self):
        self.archived = True
        self.save()