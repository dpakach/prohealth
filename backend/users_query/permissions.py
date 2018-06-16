from rest_framework import permissions
from user_profile.models import User
from . models import UserQuery

class UpdateOwnUserQuery(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
        
            return True
        
        return obj.user == request.user

class IsUpdateQuery(permissions.BasePermission):
    def has_permission(self, request, view):
        user1 = UserQuery.user.pk
        print(user1)
        if request.user == user1:
            return True
        else:
            return False


from rest_framework import permissions


class SafeMethodsOnlyPermission(permissions.BasePermission):
    """Only can access non-destructive methods (like GET and HEAD)"""
    def has_permission(self, request, view):
        return self.has_object_permission(request, view)

    def has_object_permission(self, request, view, obj=None):
        return request.method in permissions.SAFE_METHODS


class PostAuthorCanEditPermission(SafeMethodsOnlyPermission):
    """Allow everyone to list or view, but only the author can modify existing instances"""
    def has_object_permission(self, request, view, obj=None):
        # if obj is None:
        #     # Either a list or a create, so no author
        #     can_edit = True
        # else:
        # can_edit = request.user == obj.user
        if request.user == obj.user:
            can_edit = request.user
        return can_edit or super(PostAuthorCanEditPermission, self).has_object_permission(request, view, obj)

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        return obj.user == request.user


class IsProjectOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

class IsDoctorUser(permissions.BasePermission):
    """
    Allows access only to doc users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_doctor


class IsPatientUser(permissions.BasePermission):
    """
    Allows access only to patient users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_patient