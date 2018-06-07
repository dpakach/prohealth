
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated


from . models import UserQuery, Prescription, Medicine, Appointment
from . serializer import UserQuerySerializer, PrescriptionSerializer, AppointmentSerializer, MedicineSerializer
from . import permissions
# Create your views here.

class UserQueryViewset(viewsets.ModelViewSet):
    
    serializer_class = UserQuerySerializer
    queryset = UserQuery.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnUserQuery,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name_of_patient','title_problem',)

class PrescriptionViewset(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    queryset = Prescription.objects.all()

class MedicineViewset(viewsets.ModelViewSet):
    serializer_class = MedicineSerializer
    queryset = Medicine.objects.all()
    