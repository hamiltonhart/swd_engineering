from django.test import TestCase

from .models import ClientPlugin
from contacts.models import Client
from plugins.models import Plugin


class ClientPluginTests(TestCase):

    def setUp(self):
        # Client setup
        self.client_a = Client(
            first_name="Afirst", 
            last_name="Alast",
            email="client_a@test.com"
        )
        self.client_a.save()

        self.client_b = Client(
            first_name="Bfirst", 
            last_name="Blast",
            email="client_b@test.com"
        )
        self.client_b.save()

        # Plugin setup
        self.plugin_a = Plugin(
            manufacturer="Man A",
            name="Plugin A", 
            vers=1.0
        )
        self.plugin_a.save()

        self.plugin_b = Plugin(
            manufacturer="Man B",
            name="Plugin B", 
            vers=2.0
        )
        self.plugin_b.save()

        self.client_a.plugins.create(client=self.client_a, plugin=self.plugin_a)
        self.plugin_b.clients.create(plugin=self.plugin_b, client=self.client_b)



    def test_client_str(self):
        self.assertEqual(str(self.client_a), "Afirst Alast")
        self.assertEqual(str(self.client_b), "Bfirst Blast")

    def test_plugin_str(self):
        self.assertEqual(str(self.plugin_a), "Plugin A: 1.0")
        self.assertEqual(str(self.plugin_b), "Plugin B: 2.0")

    def test_client_add_plugin(self):
        plugin_len = len(self.client_a.plugins.all())
        self.assertEqual(plugin_len, 1)

        self.client_a.plugins.create(client=self.client_a, plugin=self.plugin_b)
        
        plugin_len = len(self.client_a.plugins.all())
        self.assertEqual(plugin_len, 2)


    def test_add_client(self):
        client_len = len(self.plugin_b.clients.all())
        self.assertEqual(client_len, 1)

        self.plugin_b.clients.create(client=self.client_a, plugin=self.plugin_b)
        client_len = len(self.plugin_b.clients.all())
        self.assertEqual(client_len, 2)

# Method testing
    def test_archive(self):
        confirm_false = self.client_a.plugins.all()[0]
        self.assertFalse(confirm_false.archived)

        self.client_a.plugins.all()[0].archive()
        confirm_true = self.client_a.plugins.all()[0]
        self.assertTrue(confirm_true.archived)

        self.client_a.plugins.all()[0].unarchive()
        confirm_false = self.client_a.plugins.all()[0]
        self.assertFalse(confirm_false.archived)

    def test_set_client_facility_supplied(self):
        plugin = ClientPlugin.objects.all()[0]
        self.assertFalse(plugin.client_license)

        plugin.set_client_supplied()
        self.assertTrue(plugin.client_license)

        plugin.set_facility_supplied()
        self.assertFalse(plugin.client_license)

# Queryset testing
    def test_facility_supplied_queryset(self):
        self.assertQuerysetEqual(ClientPlugin.objects.facility_supplied(), map(repr, ClientPlugin.objects.filter(client_license=False)), ordered=False)

    def test_client_supplied_queryset(self):
        self.assertFalse(ClientPlugin.objects.client_supplied(), map(repr, ClientPlugin.objects.filter(client_license=True)))


