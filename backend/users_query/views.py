from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status

from . models import UserQuery, Medicine, Appointment
from . serializer import UserQuerySerializer, AppointmentSerializer, MedicineSerializer
from . import permissions
from user_profile.models import User
from notifications.models import Notification



class UserQueryView(APIView):
    serializer_class = UserQuerySerializer

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
            serializer.save(user=user)

            # for notification
            title = request.user.first_name + " " + request.user.last_name + " has asked you a question."
            message = request.data.get('title_problem')
            users = User.objects.filter(is_doctor=True)
            query_id = serializer.data['id']
            query = get_object_or_404(UserQuery, id=query_id)
            for doc_user in users:
                notification = Notification(user=doc_user, query=query, title=title, message=message)
                notification.save()

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
        queri = get_object_or_404(UserQuery, pk=query_id)
        if queri.user != request.user:
            return Response(status=401)#unauthorized
        queri.delete()
        return Response(status=204)#no content


class AppointmentView(APIView):
    serializer_class = AppointmentSerializer

    @staticmethod
    def get(request, query_id,**kwargs):

        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment,query=query)
        return Response(AppointmentSerializer(appoint).data)
    
    @staticmethod
    def post(request, query_id):

        query = get_object_or_404(UserQuery,pk=query_id)
        serializer = AppointmentSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            user = request.user
            serializer.save(query=query)

            # for notification
            user = request.user
            title = user.first_name + " " + user.last_name + " just created an appointment with you."
            message = query.title_problem
            notification = Notification(user=query.user, query=query, title=title, message=message)
            notification.save()

            return Response(AppointmentSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)


class AppointmentDetailView(APIView):
    @staticmethod
    def get(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery,pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        return Response(AppointmentSerializer(appoint).data)

    @staticmethod
    def patch(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        serializer = AppointmentSerializer(appoint, data=request.data, context={'request':request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(AppointmentSerializer(serializer.instance).data)
        return Response(serializer.errors, status=400)

    @staticmethod
    def delete(request, query_id, **kwargs):
        query = get_object_or_404(UserQuery, pk=query_id)
        appoint = get_object_or_404(Appointment, query=query)
        if query.user != request.user:
            return Response(status=401)#unauthorized
        appoint.delete()
        return Response(status=204)#no content
        

class PrescribeView(APIView):
    serializer_class = MedicineSerializer

    @staticmethod
    def get(request, query_id):

        query = get_object_or_404(UserQuery,pk=query_id)
        prescribe =Medicine.objects.filter(query=query)
        return Response(MedicineSerializer(prescribe, many=True).data)

    @staticmethod
    def post(request, query_id):
        query = get_object_or_404(UserQuery,pk=query_id)
        serializer = MedicineSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            serializer.save(query=query)

            # for notification
            user = request.user
            title = user.first_name + " " + user.last_name + " prescribed you."
            message = query.title_problem
            notification = Notification(user=query.user, query=query, title=title, message=message)
            notification.save()

            return Response(MedicineSerializer(serializer.instance).data, status=201)
        return Response(serializer.errors, status=400)


class PrescribeDetailView(APIView):
    @staticmethod
    def get(request, query_id, prescribe_id):
        prescribe =get_object_or_404(Medicine, pk=prescribe_id)
        return Response(MedicineSerializer(prescribe).data)

    @staticmethod
    def delete(request, query_id, prescribe_id):
        query = get_object_or_404(UserQuery, pk=query_id)
        prescribe = Medicine.objects.filter(pk=prescribe_id)
        # if query.user != request.user:
        #     return Response(status=401)#unauthorized
        prescribe.delete()
        return Response(status=204)#no content
