from django.test import TestCase
from django.urls import reverse
from quark.tests.base import WithDataTestCase


class WebViewTestCase(WithDataTestCase):

    def test_can_get_index_view(self):
        res = self.client.get(reverse('web_index'))
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/index.html')

