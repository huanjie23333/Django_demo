# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-31 06:30
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Model', '0006_auto_20180531_0627'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='writer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='writers', to='Model.Writer'),
        ),
    ]
