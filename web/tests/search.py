from django.test import TestCase
from django.urls import reverse
from rest_framework import status


class SearchViewTestCase(TestCase):
    def test_can_get_search_result(self):
        _url = reverse("search:nav")

        res = self.client.get(_url, data={"q": "coin"})
        self.assertIs(res.status_code, status.HTTP_200_OK)
        self.assertTemplateUsed(res, "search/search.html")

    def test_can_get_autocomplete_result(self):
        _url = reverse("search:nav_autocomplete")
        res = self.client.get(_url, data={"q": "coin"})
        self.assertIs(res.status_code, status.HTTP_200_OK)
