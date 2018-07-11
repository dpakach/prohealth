from django.conf.urls import url
from django.conf.urls import include
from .views import (
    SentMessageView,
    SentMessageDetailView,
    ReceivedMessageView,
    QueryMessageView,
    ReceivedMessageDetailView,
    MessagesReadView,
    QueryMessagesReadView,
    get_message_age
)

urlpatterns = [
    url(r'^messages/sent/$', SentMessageView.as_view()),
    url(r'^messages/received/$', ReceivedMessageView.as_view()),
    url(r'^messages/read_all/$', MessagesReadView),
    url(r'^messages/sent/(?P<message_id>[\d]+)/$', SentMessageDetailView.as_view()),
    url(r'^messages/received/(?P<message_id>[\d]+)/$', ReceivedMessageDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/messages/$', QueryMessageView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/messages/read_all/$', QueryMessagesReadView),
    url(r'^messages/(?P<message_id>[\d]+)/get_age/$', get_message_age),
]