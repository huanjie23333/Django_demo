# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-11 08:30
from __future__ import unicode_literals

import caching.base
from django.db import migrations, models
import django.utils.timezone
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0004_auto_20170908_1457'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dapps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', django_extensions.db.fields.RandomCharField(blank=True, editable=False, include_alpha=False, length=12, unique=True)),
                ('name', models.CharField(default='', max_length=128)),
                ('founder', models.CharField(default='', max_length=128)),
                ('license', models.CharField(default='', max_length=255)),
                ('mainnet_contract_address', models.URLField(max_length=255)),
                ('ropsten', models.URLField(max_length=255)),
                ('site', models.URLField(max_length=255)),
                ('github', models.URLField(max_length=255)),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
            ],
            bases=(caching.base.CachingMixin, models.Model),
        ),
    ]
