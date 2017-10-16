# -*- coding: utf-8 -*-
from nav.models import Category, Nav, Project
from quark.tests.base import WithDataTestCase, CategoryFactory

from faker import Faker

f = Faker()


class CategoryModelTestCase(WithDataTestCase):
    def test_create_catetory_without_order(self):
        cat = Category.objects.create(cname='cname_1', ename='ename_1')
        self.assertEqual(cat.order, 1)

    def test_category_manager(self):
        new_cat = Category.objects.create(cname='lalal', ename='lll')
        new_cat2 = Category.objects.create(cname='jojo', ename='lal')

        cates = Category.objects.all()
        self.assertEqual(len(cates), 4)

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
        self.assertEqual(c_list[0].cname, 'cname2')


class NavModelTestCase(WithDataTestCase):
    def setUp(self):
        self.category = CategoryFactory()

    def test_can_create_a_nav(self):
        site_count = Nav.objects.count()

        Nav.objects.create(
            cname=f.name(),
            ename=f.name(),
            web_site=f.url(),
            cate=self.category
        )

        after_count = Nav.objects.count()
        self.assertLess(site_count, after_count)

    def test_can_add_tags_to_nav(self):
        nav = Nav.objects.create(
            cname=f.name(),
            ename=f.name(),
            web_site=f.url(),
            cate=self.category,
        )
        nav.tags.add(f.word())
        nav.tags.add(f.word())

        tags = [t.name for t in nav.tags.all()]
        self.assertIsInstance(tags, list)


class ProjectModelTestCase(WithDataTestCase):

    def test_can_create_a_dapps(self):
        dapps_count = Project.objects.count()

        Project.objects.create(
            name=f.name(),
            description=f.text()
        )
        after_count = Project.objects.count()

        self.assertLess(dapps_count, after_count)

    # def test_project_creation(self):
    #     project = Project.objects.create(slug='foo', name='eth_0')
    #     self.assertEqual(str(project), 'eth_0')
    #
    # def test_project_tag_list(self):
    #     project = Project.objects.create(slug='foo', name='eth_0')
    #     project.tags.add('TAG', 'WORD', 'THREE')
    #     self.assertEqual(set(project.tag_list()), set(['THREE', 'TAG', 'WORD', ]))
