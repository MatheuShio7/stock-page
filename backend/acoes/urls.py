from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcaoViewSet

router = DefaultRouter()
router.register(r'acoes', AcaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 