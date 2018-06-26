from user_profile.models import User
from django.shortcuts import get_object_or_404
from chat.models import Message
from rest_framework.serializers import ModelSerializer, CharField

class MessageSerializer(ModelSerializer):
    user = CharField(source='user.username', read_only=True)
    recipient = CharField(source='recipient.username')

    def create(self, validate_data):
        user = self.context['request'].user
        recipient = get_object_or_404(
            User, username = validate_data['recipient']['username'])
        msg = Message(recipient=recipient, body=validate_data['body'], user=user)
        msg.save()
        return msg
    
    class Meta:
        model = Message
        fields = ('id','user', 'recipient','timestamp','body')
