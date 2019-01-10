from django.test import TestCase

from .models import FeaturePlugin, SeriesPlugin
from plugins.models import Plugin
from rental_projects.models import Feature, Series

class ProjectPluginsTests(TestCase):
    
    def setUp(self):
        # Plugin setup
        self.plugin_a = Plugin(
            manufacturer="PM_A",
            name="Plugin A",
            vers=2.0,
            plugin_type="AAX"
        )
        self.plugin_a.save()

        self.plugin_b = Plugin(
            manufacturer="PM_B",
            name="Plugin B",
            vers=2.0,
            plugin_type="AAX"
        )
        self.plugin_b.save()

        # Project setup
        self.feature = Feature(
            title="Feature A",
            abbreviation="FA",
        )
        self.feature.save()

        self.series = Series(
            title="Series A",
            abbreviation="SAS1",
            season=2
        )
        self.series.save()
        # Project plugin setup
        self.feature_plug = FeaturePlugin(
            project=self.feature,
            plugin=self.plugin_a,
        )
        self.feature_plug.save()

        self.series_plug = SeriesPlugin(
            project=self.series,
            plugin=self.plugin_a,
        )
        self.series_plug.save()


    # ProjectPlugin Attribute Tests
    def test_feature_plugin_str(self):
        self.assertEqual(str(self.feature_plug), "Plugin A: 2.0")

    def test_series_plugin_str(self):
        self.assertEqual(str(self.series_plug), "Plugin A: 2.0")

    def test_feature_plugin_plugin(self):
        self.assertEqual(self.feature_plug.plugin, self.plugin_a)

    def test_feature_plugin_project(self):
        self.assertEqual(self.feature_plug.project, self.feature)

    def test_series_plugin_plugin(self):
        self.assertEqual(self.series_plug.plugin, self.plugin_a)

    def test_series_plugin_project(self):
        self.assertEqual(self.series_plug.project, self.series)

    # ProjectPlugin Method Tests

    def test_set_client_facility_supplied(self):
        self.assertFalse(self.feature_plug.client_license)
        self.assertFalse(self.series_plug.client_license)

        self.feature_plug.set_client_supplied()
        self.series_plug.set_client_supplied()

        self.assertTrue(self.feature_plug.client_license)
        self.assertTrue(self.series_plug.client_license)
    
    def test_set_facility_supplied(self):
        feature_test = FeaturePlugin(
            plugin=self.plugin_b, 
            project=self.feature,
            client_license=True,
        )
        feature_test.save()

        series_test = SeriesPlugin(
            plugin=self.plugin_b, 
            project=self.series,
            client_license=True,
        )
        series_test.save()

        self.assertTrue(feature_test.client_license)
        self.assertTrue(series_test.client_license)

        feature_test.set_facility_supplied()
        series_test.set_facility_supplied()

        self.assertFalse(feature_test.client_license)
        self.assertFalse(series_test.client_license)


    def test_set_archive_unarchive(self):
        self.assertFalse(self.feature_plug.archived)
        self.assertFalse(self.series_plug.archived)

        self.feature_plug.set_archive()
        self.series_plug.set_archive()

        self.assertTrue(self.feature_plug.archived)
        self.assertTrue(self.series_plug.archived)

        self.feature_plug.set_unarchive()
        self.series_plug.set_unarchive()

        self.assertFalse(self.feature_plug.archived)
        self.assertFalse(self.series_plug.archived)

    # ProjectPlugin Queryset Tests

    def test_client_facility_supplied_query(self):
        client_supplied_f_len = len(FeaturePlugin.objects.client_supplied())
        self.assertEqual(client_supplied_f_len, 0)
        client_supplied_s_len = len(SeriesPlugin.objects.client_supplied())
        self.assertEqual(client_supplied_s_len, 0)

        self.feature_plug.set_client_supplied()
        self.series_plug.set_client_supplied()

        client_supplied_f_len = len(FeaturePlugin.objects.client_supplied())
        self.assertEqual(client_supplied_f_len, 1)
        client_supplied_s_len = len(SeriesPlugin.objects.client_supplied())
        self.assertEqual(client_supplied_s_len, 1)

        self.feature_plug.set_facility_supplied()
        self.series_plug.set_facility_supplied()

        facility_supplied_f_len = len(FeaturePlugin.objects.facility_supplied())
        self.assertEqual(facility_supplied_f_len, 1)
        facility_supplied_s_len = len(SeriesPlugin.objects.facility_supplied())
        self.assertEqual(facility_supplied_s_len, 1)
        