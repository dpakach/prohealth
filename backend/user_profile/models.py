from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import os, random

def upload_posts_media_to(instance, filename):
    username = instance.username
    _, file_extension = os.path.splitext(filename)
    filename = str(random.getrandbits(64)) + file_extension
    return f'photos/{username}/{filename}'

# class UserProfileManager(BaseUserManager):

#     def create_user(self, email, first_name, last_name, date_of_birth, gender, profile_photo, photo_id, is_doc, password=None):
#         if not email:
#             raise ValueError('Users must have an email address.')

#         email = self.normalize_email(email)
#         user = self.model(email=email, first_name=first_name, last_name=last_name, date_of_birth=date_of_birth, gender=gender, profile_photo=profile_photo, photo_id=photo_id, is_doc=is_doc)

#         user.set_password(password)

#         user.save(using=self._db)

#         return user


class UserProfile(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=255, unique=True)
    date_of_birth = models.DateField(null=False)
    GENDER_CHOICES = (
        (None, None),
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = models.CharField(
        max_length=2,
        choices=GENDER_CHOICES,
        null=False,
    )
    is_doc = models.BooleanField(null=False, default=False)
    profile_photo = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)
    photo_id = models.ImageField(
        null=True, upload_to=upload_posts_media_to, default=None)

    # USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
    #                 'first_name',
    #                 'last_name',
                    'date_of_birth',
    #                 'gender',
    #                 'is_doc',
    #                 'photo_id',
                    'email'
                    ]

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
    
