from django.db import models
from django.conf import settings


class Equipamento(models.Model):
    STATUS_CHOICES = [
        ('ativo', 'Ativo'),
        ('manutencao', 'Em Manutenção'),
        ('inativo', 'Inativo'),
    ]
    nome = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    numero_serie = models.CharField(max_length=100, unique=True)
    localizacao = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='ativo', choices=STATUS_CHOICES)
    data_aquisicao = models.DateField(auto_now_add=True)
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name = "Equipamento"
        verbose_name_plural = "Equipamentos"


class Veiculo(models.Model):
    STATUS_CHOICES = [
        ('disponivel', 'Disponível'),
        ('em_uso', 'Em Uso'),
        ('manutencao', 'Em Manutenção'),
    ]
    modelo = models.CharField(max_length=255)
    placa = models.CharField(max_length=10, unique=True)
    ano = models.IntegerField()
    quilometragem = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='disponivel', choices=STATUS_CHOICES)
    data_aquisicao = models.DateField(auto_now_add=True)
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.modelo} ({self.placa})"

    class Meta:
        verbose_name = "Veículo"
        verbose_name_plural = "Veículos"


class DispositivoSeguranca(models.Model):
    STATUS_CHOICES = [
        ('operacional', 'Operacional'),
        ('com_defeito', 'Com Defeito'),
        ('offline', 'Offline'),
    ]
    tipo = models.CharField(max_length=255)
    identificador = models.CharField(max_length=100, unique=True)
    localizacao = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='operacional', choices=STATUS_CHOICES)
    ultima_manutencao = models.DateField(null=True, blank=True)
    instalado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} ({self.identificador})"

    class Meta:
        verbose_name = "Dispositivo de Segurança"
        verbose_name_plural = "Dispositivos de Segurança"