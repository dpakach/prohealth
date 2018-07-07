from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.utils.timesince import timesince
from django.utils import timezone
from .models import Notification
from rest_framework import permissions
from .serializers import NotificationSerializer
from users_query.models import UserQuery
from rest_framework.decorators import api_view

# def notification_age(created_date):
#     now = datetime.now(timezone.utc)
#     difference = now - created_date
#     try:
#         difference = now - created_date
#     except:
#         return created_date

#     if difference <= timedelta(minutes=1):
#         return 'just now'
#     return '%(time)s ago' % {'time': timesince(created_date).split(', ')[0]}

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
        query = get_object_or_404(UserQuery, id=request.data.get('query'))
        notification = Notification(user=request.user, message=message, title=title, query=query)
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
    notifications = Notification.objects.filter(query=get_object_or_404(UserQuery, id=query_id), user=request.user)
    for notification in notifications:
        notification.read_notification()
        notification.save()
    return Response('Notifications for given query read.')

@api_view(['GET'])
def get_notification_age(request, notification_id):
    notification = get_object_or_404(Notification, id=notification_id)
    created_date = notification.created
    # return Response('{}'.format(notification_age(created_date)))
    return Response(created_date)
