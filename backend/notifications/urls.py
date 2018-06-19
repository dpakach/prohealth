from django.conf.urls import url
from django.conf.urls import include
from .views import NotificationView

urlpatterns = [
    url(r'^notifications/$', NotificationView.as_view()),
]