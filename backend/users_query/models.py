from django.db import models
from user_profile.models import User, DoctorProfile
# Create your models here.

import uuid
import os

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('user_query', filename)



class UserQuery(models.Model):
    """ class used to create users health related queries"""

    TAG_CHOICES = [
        ('S','skin'),
        ('E', 'ent'),
        ('P','Physician'),
    ]

    name_of_patient = models.CharField(max_length=255, blank = False)
    age_of_patient = models.SmallIntegerField()
    height_of_patient = models.CharField(max_length=8, blank = True)
    weight_of_patient = models.SmallIntegerField(blank = True, null=True)
    title_problem = models.CharField(max_length = 510)
    description  = models.TextField()
    # file_related = models.FileField(blank=True, upload_to=get_file_path, null=True)
    tag = models.CharField(max_length = 1, choices = TAG_CHOICES)
    date_of_submission = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    taken = models.BooleanField(default=False)
    taken_by = models.ForeignKey(User, related_name='doctor', on_delete=models.CASCADE, blank=True, null=True)
    resolved = models.BooleanField(default=False)
   
    def __str__(self):
        return self.title_problem


    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)


class Appointment(models.Model):
    appointed_doc = models.CharField(max_length=25)
    appointed_date = models.DateField(default=None)
    appoint_time = models.TimeField(default=None)
    hospital = models.CharField(max_length=25)
    venue = models.CharField(max_length=100)
    query = models.OneToOneField(UserQuery, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.hospital


class Medicine(models.Model):
    name_of_medicine = models.CharField(max_length=100)
    quantity = models.IntegerField()
    times_a_day = models.IntegerField()
    remarks = models.TextField(blank=True, null=True)
    date_issued = models.DateTimeField(auto_now_add=True)
    query = models.ForeignKey(UserQuery, on_delete=models.CASCADE)

    def __str__(self):
        return self.name_of_medicine


class File(models.Model):
    file_related  = models.FileField(upload_to=get_file_path)
    date_uploaded = models.DateTimeField(auto_now_add=True)
    query = models.ForeignKey(UserQuery, on_delete=models.CASCADE)