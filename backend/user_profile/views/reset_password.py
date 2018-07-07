from django.shortcuts import get_object_or_404
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user_profile.models import ResetPasswordCode, User


# reset_password
class ResetPasswordCodeget(APIView):
    authentication_classes = ()
    permission_classes = ()

    @staticmethod
    def post(request):
        user = get_object_or_404(User, email=request.data.get('email'))
        code_object = ResetPasswordCode.objects.create(user=user)
        code = code_object.code
        current_site = get_current_site(request)
        mail_subject = 'Reset your Password.'
        message = render_to_string('reset_email.html', {
            'user': user.email,
            'domain': current_site.domain,
            'code': code,
        })
        to_email = user.email
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        email.send()
        return Response("Mail has been sent to requested user.")



class ResetPasswordView(APIView):
    authentication_classes = ()
    permission_classes = ()

    @staticmethod
    def post(request, code):
        """
        Reset password using reset password code
        """

        code = code
        password = request.data.get('password')

        try:
            reset_password_code = get_object_or_404(ResetPasswordCode, code=code)
            user = reset_password_code.user
            validate_password(password)
            user.set_password(password)
            user.save()
            reset_password_code.delete()
            return Response({'Password has been updated'})
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as error:
            return Response({'Error': error}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
