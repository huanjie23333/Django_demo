# -*- coding: utf-8 -*-

from django.test import TestCase
from nav.models import Nav, Category
# from django_nose import FastFixtureTestCase
class WithDataTestCase(TestCase):

    def setUp(self):
        cate1 = Category.objects.create(cname='finance_cname', ename='finance')
        cate2 = Category.objects.create(cname='media_cname', ename='media')
        nav = Nav.objects.create(cname='foo', ename='bar', location='china', tags='few, lot', cate=cate1)







