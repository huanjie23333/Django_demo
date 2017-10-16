# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-16 09:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Flink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.URLField()),
                ('site_name', models.CharField(max_length=128)),
                ('score', models.IntegerField(default=0)),
            ],
        ),
    ]
