from django.conf.urls import url
from django.conf.urls import include
from .views import NotificationView, NotificationsReadView, NotificationDetailView, SingleNotificationsReadView, QueryNotificationsReadView

urlpatterns = [
    url(r'^notifications/$', NotificationView.as_view()),
    url(r'^notifications/read_all/$', NotificationsReadView),
    url(r'^notifications/read_all/(?P<query_id>[\d]+)/$', QueryNotificationsReadView),
    url(r'^notifications/(?P<notification_id>[\d]+)/$', NotificationDetailView.as_view()),
    url(r'^notifications/(?P<notification_id>[\d]+)/read/$', SingleNotificationsReadView),
]