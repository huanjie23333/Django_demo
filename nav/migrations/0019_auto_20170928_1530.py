# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-28 07:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0018_auto_20170927_1037'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='project',
            options={'ordering': ['-last_updated']},
        ),
        migrations.AddField(
            model_name='project',
            name='state',
            field=models.CharField(default='', max_length=255),
        ),
    ]