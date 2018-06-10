# Generated by Django 2.0.5 on 2018-06-09 16:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import user_profile.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_patient', models.BooleanField(default=True)),
                ('is_doctor', models.BooleanField(default=False)),
                ('date_of_birth', models.DateField(default=None, null=True)),
                ('gender', models.CharField(choices=[(None, None), ('M', 'Male'), ('F', 'Female')], default=None, max_length=2, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', user_profile.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='DoctorProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_photo', models.ImageField(default=None, null=True, upload_to=user_profile.models.upload_posts_media_to)),
                ('photo_doc', models.ImageField(default=None, null=True, upload_to=user_profile.models.upload_posts_media_to)),
                ('hospital', models.CharField(max_length=255)),
                ('qualification', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=500)),
                ('speciality', models.CharField(max_length=255)),
                ('exp_pts', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ResetPasswordCode',
            fields=[
                ('code', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reset_password_codes', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'default_related_name': 'reset_password_codes',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_photo', models.ImageField(default=None, null=True, upload_to=user_profile.models.upload_posts_media_to)),
                ('photo_doc', models.ImageField(default=None, null=True, upload_to=user_profile.models.upload_posts_media_to)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
