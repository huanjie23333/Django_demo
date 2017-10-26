# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-25 07:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0029_auto_20171016_1709'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubNav',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cname', models.CharField(max_length=64)),
                ('ename', models.CharField(blank=True, max_length=64, null=True)),
                ('description', models.TextField(default='', max_length=256)),
                ('location', models.CharField(blank=True, max_length=32, null=True)),
                ('web_site', models.URLField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('handeled', models.BooleanField(default=False)),
            ],
        ),
    ]