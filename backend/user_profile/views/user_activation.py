from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_profile.models import UserActivationCode, User


# # reset_password
# class UserActivationCodeget(APIView):
#     authentication_classes = ()
#     permission_classes = ()

#     @staticmethod
#     def post(request):
#         user = get_object_or_404(User, email=request.data.get('email'))
#         code_object = UserActivationCode.objects.create(user=user)
#         code = code_object.code
#         current_site = get_current_site(request)
#         mail_subject = 'Welcome To ProHealth.'
#         message = render_to_string('activation_email.html', {
#             'user': user.email,
#             'domain': current_site.domain,
#             'code': code,
#         })
#         to_email = user.email
#         email = EmailMessage(
#             mail_subject, message, to=[to_email]
#         )
#         email.send()
#         return Response("Mail has been sent to requested user.")



class UserActivationView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @staticmethod
    def get(request, code):
        """
        User Activation View
        """

        code = code
        try:
            activation_code = get_object_or_404(UserActivationCode, code=code)
            user = activation_code.user
            user.is_active = True
            user.save()
            activation_code.delete()
            return Response({'User has been activated.'})
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as error:
            return Response({'Error': error}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
