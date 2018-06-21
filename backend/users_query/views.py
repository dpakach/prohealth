from rest_framework.decorators import detail_route
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer

from . models import UserQuery, Prescription, Medicine, Appointment
from . serializer import UserQuerySerializer, PrescriptionSerializer, AppointmentSerializer, MedicineSerializer
from . import permissions
from user_profile.models import User
# Create your views here.

# class UserQueryViewset(viewsets.ModelViewSet):
    

#     serializer_class = UserQuerySerializer
#     queryset = UserQuery.objects.all()
#     authentication_classes = (TokenAuthentication, )# def validate_user(self, user):
#     #     """
#     #     Validate authenticated user
#     #     """

#     #     if user != self.context['request'].user:
#     #         raise serializers.ValidationError('You can not create post replies for other users')
#     #     return user,)
#     permission_classes = (permissions.UpdateOwnUserQuery , IsAuthenticated, )
#     filter_backends = (filters.SearchFilter,)
#     search_fields = ('name_of_patient','title_problem',)

   

#     # def get_queryset(self):
#     #     return UserQuery.objects.filter(query=self.kwargs['query_pk'])

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)

#     # @detail_route(methods=['post'])
#     # def prescribes(self, request):
#     #     prescribe = self.get_object()
#     #     qs = prescribe.objects.all()

#     #     # page = self.paginate_queryset(qs)
#     #     # if page in not None:
#     #     #     serializer = PrescriptionSerializer(page, many = True)
#     #     #     return self.get_paginated_response(serializer.data)
#     #     serializer = PrescriptionSerializer(qs, many=True)
#     #     return Response(serializer.data)

#     # @detail_route(methods=['post'])
#     # def prescribe(self, request):
#     #     prescribe = self.get_object()

#     #     serializer = PrescriptionSerializer(data=request.data)
#     #     if serializer.is_valid():
#     #         new = Prescription.objects.create()
#     #     return Response({'id':new.id})    
#     # def get_queryset(self):
#     #     return UserQuery.objects.filter(user=self.request.user)

#     # def get_permissions(self):
#     #    if self.request.method == 'PATCH':
#     #        self.permission_classes = (permissions.UpdateOwnUserQuery,)
#     #    return super(UserQueryViewset, self).get_permissions()

# # class UserQueryView(APIView):
# #     renderer_classes = [TemplateHTMLRenderer]

# #     @staticmethod
# #     def get(request):
# #         """list user query"""
# #         user_query = UserQuery.objects.all()
# #         if type(user_query) == Response:
# #             return user_query
# #         return Response(UserQuerySerializer(user_query, many=True).data)
    
# #     @staticmethod
# #     def post(request):
# #         """create post"""
# #         serializer = UserQuerySerializer(data=request.data, context={'request':request})
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(UserQuerySerializer(serializer.instance).data, status=status.HTTP_201_CREATED)
# #         return Response(serializer.errors, status=400)


   
# class PrescriptionViewset(viewsets.ModelViewSet):
#     serializer_class = PrescriptionSerializer
#     queryset = Prescription.objects.all()
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated,)

#     # def get_permissions(self):
#     #    if self.request.method == 'POST':
#     #        self.permission_classes = (permissions.IsDoctorUser,IsAuthenticated)
#     #    return super(PrescriptionViewset, self).get_permissions()

#     @detail_route(methods=['GET'])
#     def medicine(self, request, pk=None):
#         qs = self.get_object().medicine.all()
#         serializer = MedicineSerializer(qs, many=True)
#         return Response(serializer.data)
    
#     # def perform_create(self, serializer):
#     #     return serializer.save(doctor=self.request.user)


# class AppointmentViewSet(viewsets.ModelViewSet):
#     serializer_class = AppointmentSerializer
#     queryset = Appointment.objects.all()
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated,)

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)
    
# # class UserQueryDetail(generics.RetriveUpdateDestroyAPIView):
# #     queryset = UserQuery.objects.all()
# #     serializer_class = UserQuerySerializer
# #     permission_classes = (IsAuthenticated, permissions.IsOwnerOrReadOnly,)

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class UserQueryView(APIView):

    @staticmethod
    def get(request):
        queries = UserQuery.objects.all()
        if type(queries) == Response:
            return queries
        return Response(UserQuerySerializer(queries, many=True).data)

    @staticmethod
    def post(request):
        serializer = UserQuerySerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            user = request.user
            serializer.save()
            return Response(UserQuerySerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)


class UserQueryDetailView(APIView):
    @staticmethod
    def get(request, query_id):
        queri = get_object_or_404(UserQuery, pk=query_id)
        return Response(UserQuerySerializer(queri).data)

    @staticmethod
    def patch(request, query_id):
        queri = get_object_or_404(UserQuery, pk=query_id)
        serializer = UserQuerySerializer(queri, data=request.data, context={'request':request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserQuerySerializer(serializer.instance).data)
        return Response(serializer.errors, status=404)
    
    @staticmethod
    def delete(request, query_id):
        queri = get_object_or_404(User, pk=query_id)
        if queri.user != request.user:
            return Response(status=401)#unauthorized
        post.delete()
        return Response(status=204)#no content

class PrescriptionView(APIView):

    @staticmethod
    def get(request, query_id,**kwargs):

        query = get_object_or_404(UserQuery, pk=query_id)
        prescribe = get_object_or_404(Prescription,query=query)
        return Response(PrescriptionSerializer(prescribe).data)
    

    @staticmethod
    def post(request, query_id):

        query = get_object_or_404(UserQuery,pk=query_id)
        serializer = PrescriptionSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            serializer.save(query=query)
            return Response(PrescriptionSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)

