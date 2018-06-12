from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from . import views
# from . views import UserQueryView

router = DefaultRouter()
router.register('user-query', views.UserQueryViewset)
router.register (r'pescribe', views.PrescriptionViewset)
router.register(r'appointment',views.AppointmentViewSet)


urlpatterns = [
    # url(r'user-query$',UserQueryView.as_view()),
    url(r'', include(router.urls)),
    

]