# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-07 08:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DQoute',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target_date', models.DateField(default=django.utils.timezone.now)),
                ('person', models.CharField(blank=True, max_length=64, null=True, verbose_name='作者')),
                ('quote', models.TextField(blank=True, max_length=1024, null=True, verbose_name='名言')),
            ],
            options={
                'verbose_name': '日签',
                'verbose_name_plural': '日签',
                'ordering': ['-target_date'],
            },
        ),
    ]
