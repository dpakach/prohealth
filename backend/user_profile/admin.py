from django.contrib import admin
from .models import Profile, ResetPasswordCode, User

class UserAdmin(admin.ModelAdmin):
    exclude = ('groups', 'user_permissions')

admin.site.register(Profile)
admin.site.register(ResetPasswordCode)
admin.site.register(User, UserAdmin)
