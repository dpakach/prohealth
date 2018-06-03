from rest_framework import serializers

from . models import UserQuery

class UserQuerySerializer(serializers.ModelSerializer):
    """ helps to serialize the data realted to UserQuery Model"""

    class Meta:
        model = UserQuery
        fields = '__all__'
        