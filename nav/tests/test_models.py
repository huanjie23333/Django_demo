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

    def test_category_obj_str(self):
        cat = Category.objects.create(cname='cname_1', ename='ename_1')
        self.assertEqual(str(cat), 'cname_1')

    def test_category_order(self):
        cat_1 = Category.objects.create(cname='cname1', order=10)
        cat_1 = Category.objects.create(cname='cname2', order=20)
        cat_2 = Category.objects.create(cname='cname3', order=15)
        c_list = list(Category.objects.all())
        self.assertEqual(c_list[0].cname , 'cname2')



class NavModelTestCase(WithDataTestCase):

    def test_nav_creation(self):
        cate = Category.objects.create(cname='foo', ename='bar')
        nav = Nav.objects.create(cname='foo', ename='bar', location='china', tags='few, lot', cate=cate)
        self.assertEqual(str(nav), 'bar')
        self.assertEqual(nav.main_name, 'foo')


class ProjectModelTestCase(WithDataTestCase):

    def test_project_creation(self):
        project = Project.objects.create(slug='foo', name='eth_0')
        self.assertEqual(str(project), 'eth_0')

    def test_project_tag_list(self):
        project = Project.objects.create(slug='foo', name='eth_0')
        project.tags.add('TAG', 'WORD', 'THREE')
        self.assertEqual(set(project.tag_list()), set(['THREE', 'TAG', 'WORD', ]))












