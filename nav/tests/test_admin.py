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

class NavAdminTestCase(WithDataTestCase):

    def setUp(self):
        super(NavAdminTestCase, self).setUp()
        self.site = AdminSite()
        self.category = Category.objects.create(
                                                cname='cate_cname',
                                                ename='cate_ename',
                                                order=20
                                                )

    def test_modeladmin_str(self):
        ma = NavAdmin(Nav, self.site)
        self.assertEqual(str(ma), 'nav.NavAdmin')

        ca = CategoryAdmin(Category, self.site)
        self.assertEqual(str(ca), 'nav.CategoryAdmin')

    def test_navadmin_list_filter(self):
        na = NavAdmin(Nav, self.site)
        fields = list(na.get_fields(request))
        self.assertEqual(set(fields), set(['cname', 'ename', 'location', \
                                           'web_site', 'score','status', \
                                           'alias', 'highlight', 'cate', 'tags']))


    def test_navadmin_list_data(self):
        na = NavAdmin(Nav, self.site)
        query = na.get_queryset(request)
        self.assertEqual(len(query), 2)
        self.assertEqual(query[0].cname , 'foo')



    def test_lookup(self):
        ca = CategoryAdmin(Category, self.site)
        self.assertEqual(list(ca.get_form(request).base_fields),
                               ['cname','ename', 'order' ])


class TestAdminSiteTestCase(WithDataTestCase):

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

    def test_admin_site_running(self):
        response = self.client.get('/admin/login/')
        self.assertEqual(response.status_code, 200)

    def test_admin_site_log_in(self):
        self.create_user()
        client = self.client
        client.login(username=self.username, password=self.password)
        admin_pages = [
            "/admin/",
            # put all the admin pages for your models in here.
            "/admin/auth/",
            "/admin/auth/group/",
            "/admin/auth/group/add/",
            "/admin/auth/user/",
            "/admin/nav/category/",
            "/admin/nav/nav/",
            "/admin/nav/project/",

        ]
        for page in admin_pages:
            resp = client.get(page)
            assert resp.status_code == 200
            # print('------------')
            # print(page)
            # print('------------')
            # print(resp.content)
            assert b"<!DOCTYPE html" in resp.content
