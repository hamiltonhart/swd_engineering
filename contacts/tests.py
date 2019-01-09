from django.test import TestCase

from .models import Client, Vendor, OtherContact

class ClientContactTesting(TestCase):

    def setUp(self):
        self.test_client = Client(
            first_name="TestFirst",
            last_name="TestLast",
            email="testclient@test.com",
            notes="Here is a quick note."
        )
        self.test_client.save()


    def test_client_attr(self):
        self.assertEqual(str(self.test_client), "TestFirst TestLast")
        self.assertEqual(self.test_client.email, "testclient@test.com")
        self.assertEqual(self.test_client.notes, "Here is a quick note.")


class VendorContactTesting(TestCase):

    def setUp(self):
        self.test_vendor = Vendor(
            first_name="TestFirst",
            last_name="TestLast",
            email="testclient@test.com",
            notes="Here is a quick note.",
            company="Dolby",
            title="Tech"
        )
        self.test_vendor.save()


    def test_vendor_attr(self):
        self.assertEqual(str(self.test_vendor), "TestFirst TestLast")
        self.assertEqual(self.test_vendor.email, "testclient@test.com")
        self.assertEqual(self.test_vendor.notes, "Here is a quick note.")
        self.assertEqual(self.test_vendor.company, "Dolby")
        self.assertEqual(self.test_vendor.title, "Tech")


class OtherContactTesting(TestCase):

    def setUp(self):
        self.test_other_contact = Vendor(
            first_name="TestFirst",
            last_name="TestLast",
            email="testclient@test.com",
            notes="Here is a quick note.",
        )
        self.test_other_contact.save()


    def test_other_contact_attr(self):
        self.assertEqual(str(self.test_other_contact), "TestFirst TestLast")
        self.assertEqual(self.test_other_contact.email, "testclient@test.com")
        self.assertEqual(self.test_other_contact.notes, "Here is a quick note.")
        