from django.test import TestCase
from django.urls import reverse


class WebViewTestCase(TestCase):

    def test_can_get_index_view(self):
        res = self.client.get(reverse('home_page'))
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/index.html')

