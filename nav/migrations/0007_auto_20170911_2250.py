# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-11 14:50
from __future__ import unicode_literals

import caching.base
from django.db import migrations, models
import django.utils.timezone
import django_extensions.db.fields
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0002_auto_20150616_2121'),
        ('nav', '0006_auto_20170911_2007'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', django_extensions.db.fields.RandomCharField(blank=True, editable=False, include_alpha=False, length=12, unique=True)),
                ('name', models.CharField(default='', max_length=128)),
                ('founder', models.CharField(default='', max_length=128)),
                ('license', models.CharField(default='', max_length=255)),
                ('mainnet_contract_address', models.URLField(max_length=255)),
                ('ropsten', models.URLField(max_length=255, null=True)),
                ('site', models.URLField(max_length=255, null=True)),
                ('github', models.URLField(max_length=255, null=True)),
                ('blog', models.URLField(max_length=255, null=True)),
                ('wiki', models.URLField(max_length=255, null=True)),
                ('slack', models.URLField(max_length=255, null=True)),
                ('gitter', models.URLField(max_length=255, null=True)),
                ('reddit', models.URLField(max_length=255, null=True)),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            bases=(caching.base.CachingMixin, models.Model),
        ),
        migrations.DeleteModel(
            name='Dapps',
        ),
    ]