from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from quark.tests.base import UserFactory
from rest_framework.authtoken.models import Token


# Create your tests here.

class DappsAPITestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.token = Token.objects.create(user=self.user)
        self.headers = {
            "Authorization": "Token {key}".format(key=self.token.key)
        }

    def test_can_get_dapps_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        res = self.client.get(reverse("api_dapps:list"))
        self.assertIs(res.status_code, status.HTTP_200_OK)
