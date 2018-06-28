from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = [
    url(r'^query/$',views.UserQueryView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)$',views.UserQueryDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/prescribe$',views.PrescribeView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/prescribe/(?P<prescribe_id>[\d]+)$',views.PrescribeDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/appoint$',views.AppointmentView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/appoint/1$',views.AppointmentDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/files$',views.PictureView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/files/(?P<files_id>[\d]+)$',views.PictureDetailView.as_view()),

]

