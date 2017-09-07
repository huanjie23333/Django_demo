# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-07 04:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='nav',
            name='name',
        ),
        migrations.RemoveField(
            model_name='nav',
            name='other_name',
        ),
        migrations.AddField(
            model_name='nav',
            name='alias',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='nav',
            name='cname',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='nav',
            name='ename',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='nav',
            name='web_site',
            field=models.URLField(blank=True, null=True),
        ),
    ]