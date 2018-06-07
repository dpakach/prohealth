from django.conf.urls import url
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('user-query', views.UserQueryViewset)
router.register (r'pescribe', views.PrescriptionViewset)
router.register(r'med', views.MedicineViewset)


urlpatterns = [
    url(r'', include(router.urls)),
    

]