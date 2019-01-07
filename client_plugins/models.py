from django.db import models

class ClientPlugin(models.Model):
    client = models.ForeignKey('contacts.Client', on_delete=models.CASCADE, related_name='plugins')
    plugin = models.ForeignKey('plugins.Plugin', on_delete=models.CASCADE, related_name='clients')
    client_supplied = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.plugin

    def set_client_supplied(self):
        self.client_supplied = True
        self.save()

    def set_facility_supplied(self):
        self.client_supplied = False
        self.save()

    def archive(self):
        self.archived = True
        self.save()

    def unarchive(self):
        self.archived = False
        self.save()
