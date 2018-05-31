from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView

from . import views

router = DefaultRouter()
router.register('profile', views.UserProfileViewSet)
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'^password-reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        TemplateView.as_view(template_name="index.html"),
        name='password_reset_confirm'),
]