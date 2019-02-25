from django.test import TestCase

# from .models import FeatureProjectDrive, SeriesProjectDrive
# from rental_projects.models import Feature, Series
# from harddrives.models import RentalDrive

# class ProjectDriveTests(TestCase):

#     def setUp(self):
#         # Project setup
#         self.feature = Feature(
#             title="Feature",
#             abbreviation="F1",
#         )
#         self.feature.save()

#         self.series = Series(
#             title="Series",
#             abbreviation="S1S1",
#             season=1,
#         )
#         self.series.save()

#         # RentalDrive Setup
#         self.drive_a = RentalDrive(
#             drive_number=1,
#             drive_capacity_gb=1000,

#         )
#         self.drive_a.save()

#         self.drive_b = RentalDrive(
#             drive_number=2,
#             drive_capacity_gb=2000,
#         )
#         self.drive_b.save()

#         # Inital ProjectDrive Creation

#         self.feature_drive = FeatureProjectDrive(
#             drive=self.drive_a,
#             project=self.feature,
#         )
#         self.feature_drive.save()

#         self.series_drive = SeriesProjectDrive(
#             drive=self.drive_b,
#             project=self.series,
#         )
#         self.series_drive.save()

#     # Attribute Tests

#     def test_feature_project_drive_str(self):
#         self.assertEqual(str(self.feature_drive), "1" )

#     def test_series_project_drive_str(self):
#         self.assertEqual(str(self.series_drive), "2")

#     def test_feature_drive_class(self): 
#         self.assertEqual(self.feature_drive.drive, self.drive_a)

#     def test_series_drive_class(self):
#         self.assertEqual(self.series_drive.drive, self.drive_b)

#     def test_feature_program_class(self):
#         self.assertEqual(self.feature_drive.project, self.feature)

#     def test_series_projgram_class(self):
#         self.assertEqual(self.series_drive.project, self.series)

#     # Method Tests

#     def test_set_erased_unerased(self):
#         self.assertFalse(self.feature_drive.erased)
#         self.feature_drive.erase()
#         self.assertTrue(self.feature_drive.erased)
#         self.feature_drive.unerase()
#         self.assertFalse(self.feature_drive.erased)

#         self.assertFalse(self.series_drive.erased)
#         self.series_drive.erase()
#         self.assertTrue(self.series_drive.erased)
#         self.series_drive.unerase()
#         self.assertFalse(self.series_drive.erased)

#     def test_set_backedup_unbackedup(self):
#         self.assertFalse(self.feature_drive.backed_up)
#         self.feature_drive.backup()
#         self.assertTrue(self.feature_drive.backed_up)
#         self.feature_drive.unbackup()
#         self.assertFalse(self.feature_drive.backed_up)

#         self.assertFalse(self.series_drive.backed_up)
#         self.series_drive.backup()
#         self.assertTrue(self.series_drive.backed_up)
#         self.series_drive.unbackup()
#         self.assertFalse(self.series_drive.backed_up)        

#     def test_backup_filter(self):
#         not_backedup_len = len(FeatureProjectDrive.objects.filter(backed_up=False))
#         backedup_len = len(FeatureProjectDrive.objects.filter(backed_up=True))
#         self.assertEqual(not_backedup_len, 1)
#         self.assertEqual(backedup_len, 0)

#         self.feature_drive.backup()
#         not_backedup_len = len(FeatureProjectDrive.objects.filter(backed_up=False))
#         backedup_len = len(FeatureProjectDrive.objects.filter(backed_up=True))
#         self.assertEqual(not_backedup_len, 0)
#         self.assertEqual(backedup_len, 1)




