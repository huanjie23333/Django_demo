from datetime import date

from django import forms
from django.contrib.admin.models import ADDITION, CHANGE, DELETION, LogEntry
from django.contrib.admin.options import (
    HORIZONTAL, VERTICAL, ModelAdmin, TabularInline,
    get_content_type_for_model,
)
from django.contrib.admin.sites import AdminSite
from django.contrib.admin.widgets import AdminDateWidget, AdminRadioSelect
from django.contrib.auth.models import User
from django.db import models
from django.forms.widgets import Select
from django.test import SimpleTestCase, TestCase
from django.test.utils import isolate_apps

from ..models import Category, Nav

from quark.tests.base import WithDataTestCase

class MockRequest:
    pass


class MockSuperUser:
    def has_perm(self, perm):
        return True


request = MockRequest()
request.user = MockSuperUser()

from ..admin import NavAdmin, CategoryAdmin

class NavAdminTest(WithDataTestCase):

    def setUp(self):
        super(NavAdminTest, self).setUp()
        self.site = AdminSite()

    def test_modeladmin_str(self):
        ma = NavAdmin(Nav, self.site)
        self.assertEqual(str(ma), 'nav.NavAdmin')

        ca = CategoryAdmin(Category, self.site)
        self.assertEqual(str(ca), 'nav.CategoryAdmin')

