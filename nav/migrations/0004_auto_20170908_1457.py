# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-08 06:57
from __future__ import unicode_literals

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0003_nav_highlight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nav',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]