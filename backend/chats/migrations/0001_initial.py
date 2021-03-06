# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-10 18:03
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users_query', '0006_auto_20180702_1214'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('read', models.BooleanField(default=False)),
                ('date_time', models.DateTimeField(editable=False)),
                ('query', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users_query.UserQuery')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_by', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_to', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
