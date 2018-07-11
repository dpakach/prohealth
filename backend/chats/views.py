from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer
from rest_framework import permissions
from users_query.models import UserQuery
from rest_framework.decorators import api_view

class SentMessageView(APIView):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request):
        """
        List Messages for particular user
        """

        sent_messages = Message.objects.filter(sender=request.user)
        return Response(MessageSerializer(sent_messages, many=True).data)


class ReceivedMessageView(APIView):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request):
        """
        List Messages for particular user
        """

        received_messages = Message.objects.filter(receiver=request.user)
        return Response(MessageSerializer(received_messages, many=True).data)


class SentMessageDetailView(APIView):

    @staticmethod
    def get(request, message_id):
        message = get_object_or_404(Message, id=message_id, sender=request.user)
        return Response(MessageSerializer(message).data)

class ReceivedMessageDetailView(APIView):

    @staticmethod
    def get(request, message_id):
        message = get_object_or_404(Message, id=message_id, receiver=request.user)
        return Response(MessageSerializer(message).data)


class QueryMessageView(APIView):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @staticmethod
    def get(request, query_id):
        """
        List Messages for particular user in given query
        """

        messages = Message.objects.filter(query=get_object_or_404(UserQuery, id=query_id))
        return Response(MessageSerializer(messages, many=True).data)

    @staticmethod
    def post(request):
        user = request.user
        query = get_object_or_404(UserQuery, id=request.data.get('query'))
        if user.is_doctor:
            receiver = query.user
        else:
            receiver = query.taken_by
        message = request.data.get('message')
        message = Message(sender=request.user, message=message, receiver=receiver, query=query)
        message.save()
        return Response('Message sent.')

@api_view(['GET'])
def MessagesReadView(request):
    messages = Message.objects.filter(receiver=request.user)
    for message in messages:
        message.read_message()
        message.save()
    return Response('All messages read.')

@api_view(['GET'])
def QueryMessagesReadView(request, query_id):
    query=get_object_or_404(UserQuery, id=query_id)
    messages = Message.objects.filter(query=query, receiver=request.user)
    for message in messages:
        print(message)
        message.read_message()
        message.save()
    return Response('Messages for given query read.')

@api_view(['GET'])
def get_message_age(request, message_id):
    message = get_object_or_404(Message, id=message_id)
    created_date = message.created
    return Response(created_date)