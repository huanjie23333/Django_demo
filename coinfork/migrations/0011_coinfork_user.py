# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-05 03:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coinfork', '0010_auto_20180212_2312'),
    ]

    operations = [
        migrations.AddField(
            model_name='coinfork',
            name='user',
            field=models.CharField(default='root', max_length=20),
        ),
    ]