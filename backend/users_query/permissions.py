from rest_framework import permissions
from django.shortcuts import get_object_or_404
from user_profile.models import User
from . models import UserQuery


class IsDoctorUser(permissions.BasePermission):
    """
    Allows access only to doc users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_doctor


class PrescriptionPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        query = UserQuery.objects.get(pk=view.kwargs['query_id'])
        if request.method  == 'GET':
            return request.user==query.user or request.user==query.taken_by
        elif request.method == 'POST':
            return request.user == query.taken_by
        elif request.method == 'DELETE':
            return request.user == query.taken_by
        # else:
        #     return False


class AppointmentPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        query = UserQuery.objects.get(pk=view.kwargs['query_id'])
        if request.method  == 'GET':
            return request.user==query.user or request.user==query.taken_by
        elif request.method == 'POST':
            return request.user == query.taken_by
        elif request.method == 'PATCH':
            return request.user == query.taken_by
        elif request.method == 'DELETE':
            return request.user == query.taken_by
        else:
            return False


class QueryPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        query = UserQuery.objects.get(pk=view.kwargs['query_id'])
        
        user = request.user
        if request.method  == 'GET':
            return request.user == query.user or request.user == query.taken_by or (request.user.is_doctor and not query.taken)
        elif request.method == 'POST':
            return request.user == query.user
        elif request.method == 'PATCH':
            return request.user == query.user
        elif request.method == 'DELETE':
            return request.user == query.user
        else:
            return False

class QPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True # not request.user.is_doctor
        elif request.method == 'GET':
            return True # not request.user.is_doctor
    
    # def has_object_permission(self, request, view, obj):
    #     if request.method == 'GET':
    #         return True
