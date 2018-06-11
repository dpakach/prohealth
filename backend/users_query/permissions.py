from rest_framework import permissions
from user_profile.models import User
from . models import UserQuery

class UpdateOwnUserQuery(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
        
            return True
        
        return obj.id == request.user.id

class IsUpdateQuery(permissions.BasePermission):
    def has_permission(self, request, view):
        user = UserQuery.objects.get(pk=user__id)
        print(user)
        if request.user == user:
            return True
        else:
            return False

