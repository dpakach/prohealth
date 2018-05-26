from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'username','email', 'password', 'date_of_birth', 'gender', 'profile_photo', 'photo_id', 'is_doc']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            gender = validated_data['gender'],
            date_of_birth = validated_data['date_of_birth'],
            is_doc = validated_data['is_doc'],
            profile_photo = validated_data['profile_photo'],
            photo_id = validated_data['photo_id'],
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user
