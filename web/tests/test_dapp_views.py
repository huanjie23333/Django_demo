from django.test import TestCase
from django.urls import reverse
from factory.django import DjangoModelFactory


class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = 'nav.models.Project'
        django_get_or_create = 'name'


class TestDappViewTestCase(TestCase):
    def setUp(self):
        ProjectFactory(slug='slug_1', state='normal', \
                       name='proj_name_1', founder='fd_1', \
                       software_license = 'GPL', \
                       )


    def test_dapp_list_view(self):

        resp = self.client.get(reverse('dapp:list'))
        self.assertEqual(resp.status_code, 404)
        self.assertTemplateUsed(resp, 'dapp/list.html')
        self.assertTemplateUsed(resp, 'dapp/partial/dapp_list_meta.html')
        self.assertContains(resp, 'proj_name_1')


