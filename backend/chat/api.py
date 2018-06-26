from django.db.models import Q
from django.shortcuts import get_object_or_404
from user_profile.models import User
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import SessionAuthentication

from prohealth.settings import base
from chat.serializers import MessageSerializer
from user_profile.serializers import UserSerializer
from chat.models import Message



class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    SessionAuthentication scheme used by DRF. DRF's SessionAuthentication uses
    Django's session framework for authentication which requires CSRF to be
    checked. In this case we are going to disable CSRF tokens for the API.
    """

    def enforce_csrf(self, request):
        return


class MessagePagination(PageNumberPagination):
    """
    Limit message prefetch to one page.
    """
page_size = base.MESSAGES_TO_LOAD


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    allowed_methods = ('GET','POST','HEAD','OPTIONS')
    authentication_classes = (CsrfExemptSessionAuthentication,)
    pagination_class = MessagePagination

    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset.filter(Q(recipient=request.user)|
                                            Q(user=request.user))
        target = self.request.query_params.get('target',None)
        if target is not None:
            self.queryset = self.queryset.filter(
                Q(recipient=request.user, user_username=target)|
                Q(recipient_username = target, user=request.user))
            return super(MessageViewset, self).list(request, *args, **kwargs)

        def retrieve(self, request, *args, **kwargs):
            msg = get_object_or_404(
                self.queryset.filter(
                    Q(recipient=request.user)|
                    Q(user=request.user),
                    Q(pk=kwargs['pk'])))
            serializer = self.get_serializer(msg)
            return Response(serializer.data)
        

class UserViewSet(ModelViewSet):
    queryset = User.objects.all() 
    serializer_class = UserSerializer
    allowed_methods = ('GET','HEAD','OPTIONS')
    pagination_class = None

    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset.exclude(id=request.user.id)
        return super(UserViewSet,self).list(request, *args, **kwargs)



