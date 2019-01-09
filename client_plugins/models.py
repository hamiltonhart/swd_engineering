from django.db import models


class ClientPluginQueryset(models.query.QuerySet):
    def client_supplied(self):
        return self.filter(client_license=True)

    def facility_supplied(self):
        return self.filter(client_license=False)


class ClientPluginManager(models.Manager):
    def get_queryset(self):
        return ClientPluginQueryset(self.model, using=self._db)

    def client_supplied(self):
        return self.get_queryset().client_supplied()

    def facility_supplied(self):
        return self.get_queryset().facility_supplied()


class ClientPlugin(models.Model):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='plugins')
    plugin = models.ForeignKey('plugins.Plugin', on_delete=models.CASCADE, related_name='clients')
    client_license = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    objects = ClientPluginManager()

    def __str__(self):
        return str(self.plugin)

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
