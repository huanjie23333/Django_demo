# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-31 04:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Model', '0003_auto_20180531_0248'),
    ]

    operations = [
        migrations.AddField(
            model_name='writer',
            name='article',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='Model.Article'),
        ),
        migrations.AlterField(
            model_name='article',
            name='writer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='writers', to='Model.Writer'),
        ),
    ]
