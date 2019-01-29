from django.test import TestCase

from .models import Contact

class ClientContactTesting(TestCase):

    def setUp(self):
        self.test_client = Contact(
            first_name="TestFirst",
            last_name="TestLast",
            email="testclient@test.com",
            company="Dolby",
            title="VP",
            notes="Here is a quick note."
        )
        self.test_client.save()


    def test_client_attr(self):
        self.assertEqual(str(self.test_client), "TestFirst TestLast")
        self.assertEqual(self.test_client.email, "testclient@test.com")
        self.assertEqual(self.test_client.notes, "Here is a quick note.")
        self.assertEqual(self.test_client.company, "Dolby")
        self.assertEqual(self.test_client.title, "VP")
        self.assertNotEqual(self.test_client.first_name, "First")

        