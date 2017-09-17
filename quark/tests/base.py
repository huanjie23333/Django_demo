# -*- coding: utf-8 -*-

from django.test import TestCase


from nav.models import Nav, Category

class WithDataTestCase(TestCase):
    def setUp(self):
        Category.objects.create(cname='finance_cname', ename='finance')
        Category.objects.create(cname='media_cname', ename='media')





