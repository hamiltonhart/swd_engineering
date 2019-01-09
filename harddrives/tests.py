from django.test import TestCase

from .models import RentalDrive
from rental_projects.models import Feature, Series

class RentalDriveTests(TestCase):

    def setUp(self):

        # Drive setup
        self.drive_a = RentalDrive(
            drive_number=5,
            drive_capacity_gb=1000,
        )
        self.drive_a.save()

        self.drive_b = RentalDrive(
            drive_number=10,
            drive_capacity_gb=2000,
        )
        self.drive_b.save()

        # Project setup

        self.feature = Feature(
            title="Feature",
            abbreviation="F1",
        )
        self.feature.save()

        self.series = Series(
            title="Series",
            abbreviation="S1S1",
            season=1,
        )
        self.series.save()

    
    def test_drive_string(self):
        self.assertEqual(str(self.drive_a), str(self.drive_a.drive_number))
    
    def test_drive_attr(self):
        self.assertEqual(self.drive_a.drive_number, 5)
        self.assertEqual(self.drive_a.drive_capacity_gb, 1000)

    # Method tests


    
    # Query tests
    def test_feature_available(self):
        available_len = len(RentalDrive.objects.available())
        self.assertEqual(available_len, 2)

        self.drive_a.feature_project.create(drive=self.drive_a, project=self.feature)

        available_len = len(RentalDrive.objects.available())
        self.assertEqual(available_len, 1)

    def test_series_available(self):
        available_len = len(RentalDrive.objects.available())
        self.assertEqual(available_len, 2)

        self.drive_a.series_project.create(drive=self.drive_a, project=self.series)

        available_len = len(RentalDrive.objects.available())
        self.assertEqual(available_len, 1)
