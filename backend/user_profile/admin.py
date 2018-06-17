from django.contrib import admin
from .models import UserProfile, DoctorProfile, ResetPasswordCode, User

class UserAdmin(admin.ModelAdmin):
    exclude = ('groups', 'user_permissions')

admin.site.register(UserProfile)
admin.site.register(DoctorProfile)
admin.site.register(ResetPasswordCode)
admin.site.register(User, UserAdmin)
