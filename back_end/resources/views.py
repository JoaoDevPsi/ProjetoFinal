from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Equipamento, Veiculo, DispositivoSeguranca
from .serializers import EquipamentoSerializer, VeiculoSerializer, DispositivoSegurancaSerializer
from .permissions import IsAdminOrManagerOrSecurityAdmin


class EquipamentoListCreateView(generics.ListCreateAPIView):
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]

class EquipamentoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipamento.objects.all()
    serializer_class = EquipamentoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]


class VeiculoListCreateView(generics.ListCreateAPIView):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]

class VeiculoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]


class DispositivoSegurancaListCreateView(generics.ListCreateAPIView):
    queryset = DispositivoSeguranca.objects.all()
    serializer_class = DispositivoSegurancaSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]

class DispositivoSegurancaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DispositivoSeguranca.objects.all()
    serializer_class = DispositivoSegurancaSerializer
    permission_classes = [IsAuthenticated, IsAdminOrManagerOrSecurityAdmin]


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        total_equipamentos = Equipamento.objects.count()
        total_veiculos = Veiculo.objects.count()
        total_dispositivos = DispositivoSeguranca.objects.count()

        equipamentos_por_status = {}
        for status_choice, _ in Equipamento.STATUS_CHOICES:
            count = Equipamento.objects.filter(status=status_choice).count()
            equipamentos_por_status[status_choice] = count

        veiculos_por_status = {}
        for status_choice, _ in Veiculo.STATUS_CHOICES:
            count = Veiculo.objects.filter(status=status_choice).count()
            veiculos_por_status[status_choice] = count
        
        dispositivos_por_status = {}
        for status_choice, _ in DispositivoSeguranca.STATUS_CHOICES:
            count = DispositivoSeguranca.objects.filter(status=status_choice).count()
            dispositivos_por_status[status_choice] = count


        data = {
            'total_equipamentos': total_equipamentos,
            'total_veiculos': total_veiculos,
            'total_dispositivos': total_dispositivos,
            'equipamentos_por_status': equipamentos_por_status,
            'veiculos_por_status': veiculos_por_status,
            'dispositivos_por_status': dispositivos_por_status,
        }
        return Response(data)