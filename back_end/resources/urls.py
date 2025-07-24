from django.urls import path
from .views import (
    EquipamentoListCreateView, EquipamentoRetrieveUpdateDestroyView,
    VeiculoListCreateView, VeiculoRetrieveUpdateDestroyView,
    DispositivoSegurancaListCreateView, DispositivoSegurancaRetrieveUpdateDestroyView,
    DashboardStatsView,
)

urlpatterns = [
    path('equipamentos/', EquipamentoListCreateView.as_view(), name='equipamento-list-create'),
    path('equipamentos/<int:pk>/', EquipamentoRetrieveUpdateDestroyView.as_view(), name='equipamento-detail'),

    path('veiculos/', VeiculoListCreateView.as_view(), name='veiculo-list-create'),
    path('veiculos/<int:pk>/', VeiculoRetrieveUpdateDestroyView.as_view(), name='veiculo-detail'),

    path('dispositivos-seguranca/', DispositivoSegurancaListCreateView.as_view(), name='dispositivo-seguranca-list-create'),
    path('dispositivos-seguranca/<int:pk>/', DispositivoSegurancaRetrieveUpdateDestroyView.as_view(), name='dispositivo-seguranca-detail'),

    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
]