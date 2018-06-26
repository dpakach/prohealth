from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from rest_framework.routers import DefaultRouter
from chat.api import MessageViewSet, UserViewSet

router = DefaultRouter()
router.register(r'message', MessageViewSet, base_name='message-api')
router.register(r'user', UserViewSet, base_name='user-api')

urlpatterns = [
    url(r'', include(router.urls)),

    # path('', login_required(
    #     TemplateView.as_view(template_name='core/chat.html')), name='home'),
]