# -*- coding: utf-8 -*-

from django.test import TestCase
from factory.django import DjangoModelFactory
from nav.models import Nav, Category
from faker import Faker


# from django_nose import FastFixtureTestCase
from django.contrib.auth.models import User


f = Faker()



class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)


class CategoryFactory(DjangoModelFactory):
    class Meta:
        model = Category
        django_get_or_create = ('cname',)

    cname = f.name()


class NavFactory(DjangoModelFactory):
    class Meta:
        model = Nav
        django_get_or_create = ('cname',)

    cname = f.name()

class WithDataTestCase(TestCase):
    def create_user(self):
        self.username = "test_admin"
        self.password = User.objects.make_random_password()
        user = UserFactory(username=self.username)
        user.set_password(self.password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        self.user = user

    def setUp(self):
        # self.cate1 = Category.objects.create(cname='finance_cname', ename='finance')
        self.cate1 = CategoryFactory(cname='finance_cname', ename='finance')

        # self.cate2 = Category.objects.create(cname='media_cname', ename='media')
        self.cate2 = CategoryFactory(cname='media_cname', ename='media')

        # self.nav = Nav.objects.create(cname='foo', ename='bar', location='china', cate=self.cate1)
        self.nav = NavFactory(cname='foo', ename='bar', location='china', cate=self.cate1)

        # self.nav2 = Nav.objects.create(cname='nav2', ename='enav2', location='china', cate=self.cate2)
        self.nav2 = NavFactory(cname='nav2', ename='enav2', location='china', cate=self.cate2)

        self.nav.tags.add('tag1', 'tag2')
        self.nav2.tags.add('tag3', 'tag4')
