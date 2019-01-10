from django.test import TestCase

from .models import CustomUser

class UserTests:

    def setUp(self):
        self.user = CustomUser(
            username="user_username",
            email="user@email.com",
        )
        self.user.save()