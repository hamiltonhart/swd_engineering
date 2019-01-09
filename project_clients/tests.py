from django.test import TestCase

from rental_projects.models import Feature, Series
from contacts.models import Client

class ProjectClientTests(TestCase):

    def setUp(self):
        
        # Rental Project Definitions
        self.feature = Feature(
            title="Feature",
            abbreviation="F1",
        )
        self.feature.save()

        self.series = Series(
            title="Series",
            season=1,
            abbreviation="S1"
        )
        self.series.save()

        # Client Definitions
        self.client_a = Client(
            first_name="Afirst",
            last_name="Alast",
            email="client_a@test.com",
        )
        self.client_a.save()

        self.client_b = Client(
            first_name="Bfirst",
            last_name="Blast",
            email="client_b@test.com",
        )
        self.client_b.save()

        self.feature.feature_clients.create(client=self.client_a, project=self.feature, client_role="DX")
        self.series.series_clients.create(client=self.client_a, project=self.series, client_role="DX")
    

# Add/Remove Project Clients
    def test_add_client_series(self):
        series_len = len(self.series.series_clients.all())
        self.assertEqual(series_len, 1)

        self.series.series_clients.create(client=self.client_b, project=self.series)
        series_len = len(self.series.series_clients.all())
        self.assertEqual(series_len, 2)

    def test_add_client_feature(self):
        feature_len = len(self.feature.feature_clients.all())
        self.assertEqual(feature_len, 1)

        self.feature.feature_clients.create(client=self.client_b, project=self.feature)
        feature_len = len(self.feature.feature_clients.all())
        self.assertEqual(feature_len, 2)

    def test_add_feature_client(self):
        client_len = len(self.client_b.feature_projects.all())
        self.assertEqual(client_len, 0)

        self.client_b.feature_projects.create(client=self.client_b, project=self.feature)
        client_len = len(self.client_b.feature_projects.all())
        self.assertEqual(client_len, 1)

    def test_add_series_client(self):
        client_len = len(self.client_b.series_projects.all())
        self.assertEqual(client_len, 0)

        self.client_b.series_projects.create(client=self.client_b, project=self.series)
        client_len = len(self.client_b.series_projects.all())
        self.assertEqual(client_len, 1)

# Queryset Tests

    def test_client_project_mixers(self):
        new_client_fx = Client(
            first_name="New", 
            last_name="Client", 
            email="newclientfx@test.com"
        )
        new_client_fx.save()

        new_client_dx_mx = Client(
            first_name="New", 
            last_name="DXMX",
            email="dxmxclient@test.com"
        )
        new_client_dx_mx.save()

        self.feature.feature_clients.create(
            client=new_client_fx, 
            project=self.feature, 
            client_role="FX"
        )

        self.feature.feature_clients.create(
            client=new_client_dx_mx, 
            project=self.feature, 
            client_role="DXMX"
        )
               
        mixers = self.feature.feature_clients.mixers()
        mixers_len = len(self.feature.feature_clients.mixers())

        self.assertEqual(mixers_len, 3)
        self.assertEqual(mixers[0].client.first_name, self.client_a.first_name)
        self.assertEqual(mixers[1].client.first_name, new_client_fx.first_name)
        self.assertEqual(mixers[2].client.first_name, new_client_dx_mx.first_name)

    def test_client_project_recordists(self):
        new_recordist = Client(
            first_name="New",
            last_name="Recordist",
            email="newrecordist@test.com",
        )
        new_recordist.save()

        self.feature.feature_clients.create(
            client=new_recordist, 
            project=self.feature, 
            client_role="REC"
        )
        recordists = self.feature.feature_clients.recordists()
        recordists_len = len(recordists)

        self.assertEqual(recordists_len, 1)
        self.assertEqual(recordists[0].client.first_name, new_recordist.first_name)

    def test_client_project_other_client(self):
        other_client = Client(
            first_name="Other",
            last_name="Client",
            email="otherclient@test.com"
        )
        other_client.save()

        self.series.series_clients.create(
            client=other_client, 
            project=self.series,
            client_role="Misc"
        )

        other_clients = self.series.series_clients.other_clients()
        other_clients_len = len(other_clients)

        self.assertEqual(other_clients_len, 1)
        self.assertEqual(other_clients[0].client.first_name, other_client.first_name)

