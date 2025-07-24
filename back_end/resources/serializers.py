from rest_framework import serializers
from .models import Equipamento, Veiculo, DispositivoSeguranca
from users.models import User 

class EquipamentoSerializer(serializers.ModelSerializer):
    responsavel_username = serializers.CharField(source='responsavel.username', read_only=True)
    responsavel = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Equipamento
        fields = '__all__'

class VeiculoSerializer(serializers.ModelSerializer):
    responsavel_username = serializers.CharField(source='responsavel.username', read_only=True)
    responsavel = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Veiculo
        fields = '__all__'

class DispositivoSegurancaSerializer(serializers.ModelSerializer):
    instalado_por_username = serializers.CharField(source='instalado_por.username', read_only=True)
    instalado_por = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = DispositivoSeguranca
        fields = '__all__'