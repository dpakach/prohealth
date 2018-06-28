from django.conf.urls import url
from django.conf.urls import include
from .views import NotificationView, NotificationsReadView

urlpatterns = [
    url(r'^notifications/$', NotificationView.as_view()),
    url(r'^notifications/read_all/$', NotificationsReadView),
]