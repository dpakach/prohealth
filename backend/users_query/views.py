from django.shortcuts import render
from rest_framework import viewsets


from . models import UserQuery
from . serializer import UserQuerySerializer
# Create your views here.

class UserQueryViewset(viewsets.ModelViewSet):
    
    serializer_class = UserQuerySerializer
    queryset = UserQuery.objects.all()
