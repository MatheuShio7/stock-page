from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcaoViewSet, atualizar_observacao, deletar_observacao

router = DefaultRouter()
router.register(r'acoes', AcaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('observacoes/<int:pk>/', atualizar_observacao, name='atualizar_observacao'),
    path('observacoes/<int:pk>/delete/', deletar_observacao, name='deletar_observacao'),
] 