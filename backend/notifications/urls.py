from django.conf.urls import url
from django.conf.urls import include
from .views import NotificationView, NotificationsReadView, NotificationDetailView, SingleNotificationsReadView

urlpatterns = [
    url(r'^notifications/$', NotificationView.as_view()),
    url(r'^notifications/read_all/$', NotificationsReadView),
    url(r'^notifications/(?P<notification_id>[\d]+)/$', NotificationDetailView.as_view()),
    url(r'^notifications/(?P<notification_id>[\d]+)/read/$', SingleNotificationsReadView),
]