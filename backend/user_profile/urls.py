from django.conf.urls import url
from django.conf.urls import include
from django.views.generic import TemplateView
from .views.user import UserView, UserDetail
from .views.login import LoginView
from .views.logout import LogoutView
from .views.profile import ProfileView, ProfileDetail
from .views.reset_password import ResetPasswordView
from .views.update_password import UpdatePasswordView

from . import views

urlpatterns = [
    # url(r'auth/', include('rest_auth.urls')),
    # url(r'^auth/registration/', include('rest_auth.registration.urls')),
    # url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     TemplateView.as_view(template_name="index.html"),
    #     name='password_reset_confirm'),

        # Login / logout
    url(r'^login/$', LoginView.as_view()),
    url(r'^logout/$', LogoutView.as_view()),

    # Password management
    url(r'^reset_password/$', ResetPasswordView.as_view()),
    url(r'^update_password/$', UpdatePasswordView.as_view()),

    # Profiles
    url(r'^profiles/$', ProfileView.as_view()),
    url(r'^profiles/(?P<profile_id>[\d]+)$', ProfileDetail.as_view()),

    # Users
    url(r'^users/$', UserView.as_view()),
    url(r'^users/(?P<user_id>[\d]+)$', UserDetail.as_view()),
]