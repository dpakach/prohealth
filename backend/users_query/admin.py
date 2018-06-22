from django.contrib import admin
from . models import UserQuery, Appointment, Medicine

admin.site.register(UserQuery)
admin.site.register(Appointment)
admin.site.register(Medicine)

