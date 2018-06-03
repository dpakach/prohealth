from django.db import models
from user_profile.models import UserProfile
# Create your models here.

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
    tag = models.CharField(max_length = 1, choices = TAG_CHOICES)
    date_of_submission = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(UserProfile)

    def __str__(self):
        return self.title_problem


    def save_model(self, request, obj, form, change):
        obj.user = request.user
        super().save_model(request, obj, form, change)

