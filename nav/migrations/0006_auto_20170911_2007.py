# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-11 12:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0005_dapps'),
    ]

    operations = [
        migrations.AddField(
            model_name='dapps',
            name='blog',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dapps',
            name='gitter',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dapps',
            name='reddit',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dapps',
            name='slack',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dapps',
            name='wiki',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dapps',
            name='github',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dapps',
            name='ropsten',
            field=models.URLField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='dapps',
            name='site',
            field=models.URLField(max_length=255, null=True),
        ),
    ]
