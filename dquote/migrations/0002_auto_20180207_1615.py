# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-07 08:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dquote', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dqoute',
            name='quote',
            field=models.CharField(blank=True, max_length=1024, null=True, verbose_name='名言'),
        ),
    ]
