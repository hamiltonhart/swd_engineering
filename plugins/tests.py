from django.test import TestCase

from .models import Plugin


class PluginTests(TestCase):

    def setUp(self):
        self.plugin_test = Plugin(
            manufacturer="Test Manufacturer",
            name="Test Plugin",
            vers=1.0,
            plugin_type="AAX",
        )
        self.plugin_test.save()

    def test_plugin_attr(self):
        self.assertEqual(str(self.plugin_test), "Test Plugin: 1.0")
        self.assertEqual(self.plugin_test.manufacturer, "Test Manufacturer")
        self.assertEqual(self.plugin_test.vers, 1.0)
        self.assertEqual(self.plugin_test.plugin_type, "AAX")

    def test_plugin_archive(self):
        self.assertEqual(self.plugin_test.archived, False)
        self.plugin_test.archive()
        self.assertEqual(self.plugin_test.archived, True)

    def test_plugin_type_queryset(self):
        self.assertQuerysetEqual(Plugin.objects.aax(), map(repr, Plugin.objects.filter(plugin_type="AAX")))

        waves_len = len(Plugin.objects.waves())
        vst_len = len(Plugin.objects.vst())
        vst3_len = len(Plugin.objects.vst3())
        au_len = len(Plugin.objects.audio_units())

        self.assertEqual(waves_len, 0)
        self.assertEqual(vst_len, 0)
        self.assertEqual(vst3_len, 0)
        self.assertEqual(au_len, 0)

        self.plugin_test.plugin_type = "Waves"
        self.plugin_test.save()
        self.assertEqual(Plugin.objects.waves()[0], self.plugin_test)
        self.plugin_test.plugin_type = "VST"
        self.plugin_test.save()
        self.assertEqual(Plugin.objects.vst()[0], self.plugin_test)
        self.plugin_test.plugin_type = "VST3"
        self.plugin_test.save()
        self.assertEqual(Plugin.objects.vst3()[0], self.plugin_test)
        self.plugin_test.plugin_type = "AU"
        self.plugin_test.save()
        self.assertEqual(Plugin.objects.audio_units()[0], self.plugin_test)
        self.plugin_test.plugin_type = "AAX"
        self.plugin_test.save()
