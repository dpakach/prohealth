from rest_framework.decorators import detail_route
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



from . models import UserQuery, Prescription, Medicine, Appointment
from . serializer import UserQuerySerializer, PrescriptionSerializer, AppointmentSerializer, MedicineSerializer
from . import permissions
from user_profile.models import User
# Create your views here.

class UserQueryViewset(viewsets.ModelViewSet):
    

    serializer_class = UserQuerySerializer
    queryset = UserQuery.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name_of_patient','title_problem',)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_permissions(self):
       if self.request.method == 'PATCH':
           self.permission_classes = (IsAuthenticated, permissions.UpdateOwnUserQuery,)
       return super(UserQueryViewset, self).get_permissions()

   
class PrescriptionViewset(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    queryset = Prescription.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @detail_route(methods=['GET'])
    def medicine(self, request, pk=None):
        qs = self.get_object().medicine.all()
        serializer = MedicineSerializer(qs, many=True)
        return Response(serializer.data)
    
    # def perform_create(self, serializer):
    #     return serializer.save(doctor=self.request.user)


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    