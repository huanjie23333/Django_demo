from django.test import TestCase
# from django.urls import reverse
from django.contrib.auth.models import User


class TestPageErrorTestCase(TestCase):

    def create_user(self):
        self.username = "test_admin"
        self.password = User.objects.make_random_password()
        user, created = User.objects.get_or_create(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()
        self.user = user

    def test_page_404_error(self):
        page_404 = '/not_exist_page/'
        resp = self.client.get(page_404)
        self.assertEqual(resp.status_code, 404)
        self.assertTemplateUsed(resp, 'errors/404.html')

    # def test_page_500_error(self):
    #     self.create_user()
    #     client = self.client
    #     client.login(username=self.username, password=self.password)
    #
    #     page_500 = reverse('web_error_testing')
    #
    #     with self.assertRaises(Exception):
    #         resp = self.client.get(page_500)
    #
    #     self.assertEqual(resp.status_code, 505)
    #     self.assertTemplateUsed(resp, 'web/404.htl')
    #
    #
    #
