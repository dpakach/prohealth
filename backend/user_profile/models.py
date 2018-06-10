import uuid, os, random
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager

def upload_posts_media_to(instance, filename):
    username = instance.username
    _, file_extension = os.path.splitext(filename)
    filename = str(random.getrandbits(64)) + file_extension
    return f'photos/{username}/{filename}'

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **kwargs):
        email = self.normalize_email(email)
        is_staff = kwargs.pop('is_staff', False)
        is_superuser = kwargs.pop('is_superuser', False)
        user = self.model(
            email=email,
            is_active=True,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, is_staff=True, is_superuser=True, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=True)
    is_doctor = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True, default=None)
    GENDER_CHOICES = (
        (None, None),
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = models.CharField(
        max_length=2,
        choices=GENDER_CHOICES,
        null=True,
        default=None,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return self.first_name + self.last_name

    def save(self, *args, **kwargs):
        if not self.password:
            self.password = str(uuid.uuid4()).replace('-', '')
        super(User, self).save(*args, **kwargs)

class UserProfile(models.Model):
    profile_photo = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)
    photo_doc = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email

class DoctorProfile(models.Model):
    profile_photo = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)
    photo_doc = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)
    hospital = models.CharField(max_length=255)
    qualification = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    speciality = models.CharField(max_length=255)
    exp_pts = models.IntegerField(default=0)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class ResetPasswordCode(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    class Meta:
        default_related_name = 'reset_password_codes'

    def __str__(self):
        return f'{self.user.email} - {self.code}'

