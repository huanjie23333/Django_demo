# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-01 05:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0037_auto_20180116_1206'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='tags',
        ),
        migrations.DeleteModel(
            name='Project',
        ),
    ]