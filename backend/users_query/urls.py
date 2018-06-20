from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = [
    url(r'^query$',views.UserQueryView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)$',views.UserQueryDetailView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/prescribe$',views.PrescriptionView.as_view()),
    url(r'^query/(?P<query_id>[\d]+)/prescribe/(?P<prescription_id>[\d]+)$',views.PrescriptionView.as_view()),

]

