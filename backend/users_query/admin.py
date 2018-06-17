from django.contrib import admin
from . models import UserQuery, Appointment, Medicine, Prescription
# Register your models here.
admin.site.register(UserQuery)
admin.site.register(Appointment)
admin.site.register(Medicine)
admin.site.register(Prescription)
