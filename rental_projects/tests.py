from django.test import TestCase

from .models import RentalProject

class FeatureTests(TestCase):
    pass

#     def setUp(self):
#         self.feature_test = Feature(
#             title="Feature Test",
#             abbreviation="FT",
#             channel_config="ATMOS",
#             room="Stage 2",
#             additional_info="Here's some info.",
#         )
#         self.feature_test.save()

#     def test_feature_attr(self):
#         self.assertEqual(str(self.feature_test), "Feature Test")
#         self.assertEqual(self.feature_test.abbreviation, "FT")
#         self.assertEqual(self.feature_test.protools_vers, 12.4)
#         self.assertEqual(self.feature_test.number_of_systems, 4)
#         self.assertEqual(self.feature_test.drive_user, "FT")
#         self.assertEqual(self.feature_test.drive_pass, "FT")
#         self.assertEqual(self.feature_test.ms_user, "FT")
#         self.assertEqual(self.feature_test.ms_pass, "FT")
#         self.assertEqual(self.feature_test.channel_config, "ATMOS")
#         self.assertEqual(self.feature_test.room, "Stage 2")
#         self.assertEqual(self.feature_test.additional_info, "Here's some info.")


# class SeriesTests(TestCase):

#     def setUp(self):
#         self.series_test = Series(
#             title="Series Test",
#             season=1,
#             abbreviation="ST",
#             channel_config="ATMOS",
#             room="Stage 2",
#             additional_info="Here's some info.",
#         )
#         self.series_test.save()

#     def test_feature_attr(self):
#         self.assertEqual(str(self.series_test), "Series Test: Season 1")
#         self.assertEqual(self.series_test.season, 1)
#         self.assertEqual(self.series_test.abbreviation, "ST")
#         self.assertEqual(self.series_test.protools_vers, 12.4)
#         self.assertEqual(self.series_test.number_of_systems, 4)
#         self.assertEqual(self.series_test.drive_user, "ST")
#         self.assertEqual(self.series_test.drive_pass, "ST")
#         self.assertEqual(self.series_test.ms_user, "ST")
#         self.assertEqual(self.series_test.ms_pass, "ST")
#         self.assertEqual(self.series_test.channel_config, "ATMOS")
#         self.assertEqual(self.series_test.room, "Stage 2")
#         self.assertEqual(self.series_test.additional_info, "Here's some info.")
