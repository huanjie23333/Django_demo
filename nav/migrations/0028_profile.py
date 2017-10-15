# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-15 04:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0027_project_identified_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, null=True, verbose_name='description')),
                ('site', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='nav.Nav')),
            ],
        ),
    ]
