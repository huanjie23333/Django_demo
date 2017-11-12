from django.test import TestCase
from django.urls import reverse


class SubmitViewTestCase(TestCase):
    def testSubmitView(self):
        resp = self.client.get(reverse('web_submit'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/submit.html')