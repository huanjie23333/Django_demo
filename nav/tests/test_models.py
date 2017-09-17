# -*- coding: utf-8 -*-
from nav.models import Category, Nav, Project
from quark.tests.base import WithDataTestCase

class CategoryModelTestCase(WithDataTestCase):

    def test_create_catetory_without_order(self):
        cat = Category.objects.create(cname='cname_1', ename='ename_1')
        self.assertEqual(cat.order, 1)

    def test_category_manager(self):
        new_cat = Category.objects.create(cname='lalal', ename='lll')
        new_cat2 = Category.objects.create(cname='jojo', ename='lal')

        cates = Category.objects.all()
        self.assertEqual(len(cates) , 4)

    def test_catetory_obj_strinfy(self):
        new_cate = Category.objects.create(cname='foo', ename='bar')
        self.assertEqual(str(new_cate), 'foo')

class NavModelTest(WithDataTestCase):

    def test_nav_creation(self):
        cate = Category.objects.create(cname='foo', ename='bar')
        nav = Nav.objects.create(cname='foo', ename='bar', location='china', tags='few, lot', cate=cate)
        self.assertEqual(str(nav), 'bar')
        self.assertEqual(nav.main_name, 'foo')


class ProjectModelTest(WithDataTestCase):

    def test_project_creation(self):
        project = Project.objects.create(slug='foo', name='eth_0')
        self.assertEqual(str(project), 'eth_0')









