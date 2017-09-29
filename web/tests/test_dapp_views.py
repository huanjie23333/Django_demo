from django.test import TestCase
from django.urls import reverse
from factory.django import DjangoModelFactory

from nav.models import Project


class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = 'nav.Project'
        django_get_or_create = ('name',)


class TestDappViewTestCase(TestCase):
    def setUp(self):
        ProjectFactory(slug='slug_1', state='normal', \
                       name='proj_name_1', founder='fd_1', \
                       software_license = 'GPL', \
                       )

    def test_dapp_list_view(self):
        resp = self.client.get(reverse('dapp:list'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'dapp/list.html')
        self.assertTemplateUsed(resp, 'dapp/partial/dapp_list_meta.html')
        self.assertContains(resp, 'proj_name_1')


    def test_dapp_detail_view(self):
        p = Project.objects.all()[0]
        resp = self.client.get(reverse('dapp:detail', args=[p.slug, ]))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'dapp/detail.html')
        self.assertTemplateUsed(resp, 'dapp/patial/dapp_detail_meta.html')
        self.assertContains(resp, 'fd_2')








