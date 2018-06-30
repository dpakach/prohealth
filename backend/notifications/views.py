from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from rest_framework import permissions
from .serializers import NotificationSerializer
from users_query.models import UserQuery
from rest_framework.decorators import api_view

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

class NotificationDetailView(APIView):

    @staticmethod
    def get(request, notification_id):
        notification = get_object_or_404(Notification, id=notification_id, user=request.user)
        print(notification)
        return Response(NotificationSerializer(notification).data)
    

@api_view(['GET'])
def NotificationsReadView(request):
    notifications = Notification.objects.filter(user=request.user)
    for notification in notifications:
        notification.read_notification()
        notification.save()
    return Response('All notifications read.')

@api_view(['GET'])
def SingleNotificationsReadView(request, notification_id):
    notification = get_object_or_404(Notification, id=notification_id, user=request.user)
    notification.read_notification()
    notification.save()
    return Response('Notification read.')

@api_view(['GET'])
def QueryNotificationsReadView(request, query_id):
    notifications = Notification.objects.filter(query=get_object_or_404(UserQuery, id=query_id))
    for notification in notifications:
        notification.read_notification()
        notification.save()
    return Response('Notifications for given query read.')
