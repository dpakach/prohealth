from django.conf.urls import url
from django.conf.urls import include
from .views import SentMessageView, SentMessageDetailView, ReceivedMessageView, QueryMessageView, ReceivedMessageDetailView

urlpatterns = [
    url(r'^messages/sent/$', SentMessageView.as_view()),
    url(r'^messages/received/$', ReceivedMessageView.as_view()),
    # url(r'^messages/read_all/$', NotificationsReadView),
    # url(r'^messages/read_all/(?P<query_id>[\d]+)/$', QueryNotificationsReadView),
    url(r'^messages/sent/(?P<message_id>[\d]+)/$', SentMessageDetailView.as_view()),
    url(r'^messages/received/(?P<message_id>[\d]+)/$', ReceivedMessageDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/messages/$', QueryMessageView.as_view()),
    # url(r'^notifications/(?P<notification_id>[\d]+)/get_age/$', get_notification_age),
    # url(r'^notifications/(?P<notification_id>[\d]+)/read/$', SingleNotificationsReadView),
]