from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from rest_framework import permissions
from .serializers import NotificationSerializer

class NotificationView(APIView):
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request):
        """
        List notifications for particular user
        """

        notifications = Notification.objects.filter(user=request.user)
        return Response(NotificationSerializer(notifications, many=True).data)

    @staticmethod
    def post(request):
        title = request.data.get('title')
        message = request.data.get('message')
        notification = Notification(user=request.user, message=message, title=title)
        notification.save()
        return Response('Notification Added.')