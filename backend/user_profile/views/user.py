from django.shortcuts import get_object_or_404
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user_profile.models import UserProfile, User, DoctorProfile, ResetPasswordCode, UserActivationCode
from user_profile.serializers import (
    UserSerializer,
    UserSerializerCreate,
    UserSerializerLogin,
    UserSerializerUpdate
)

# users
class UserView(APIView):

    @staticmethod
    def get(request):
        """
        List users
        """

        users = User.objects.all()
        return Response(UserSerializer(users, many=True).data)

    @staticmethod
    def post(request):
        """
        Create user
        """

        serializer = UserSerializerCreate(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.is_active = False
            user.save()
            user = get_object_or_404(User, email=request.data.get('email'))
            code_object = UserActivationCode.objects.create(user=user)
            code = code_object.code
            current_site = get_current_site(request)
            print(current_site)
            print(current_site.domain)
            mail_subject = 'Welcome To ProHealth.'
            message = render_to_string('user_activation.html', {
                'user': user.email,
                'domain': current_site.domain,
                'code': code,
            })
            to_email = user.email
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()
            UserProfile(user=user).save()
            DoctorProfile(user=user).save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# users/{user_id}
class UserDetail(APIView):

    @staticmethod
    def get(request, user_id):
        """
        View individual user
        """

        user = get_object_or_404(User, pk=user_id)
        return Response(UserSerializer(user).data)

    @staticmethod
    def patch(request, user_id):
        """
        Update authenticated user
        """

        user = get_object_or_404(User, pk=user_id)
        if user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializerUpdate(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializerLogin(serializer.instance).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, user_id):
        """
        Delete user
        """

        user = get_object_or_404(User, pk=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
