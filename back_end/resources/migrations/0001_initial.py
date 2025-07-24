from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DispositivoSeguranca',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=255)),
                ('identificador', models.CharField(max_length=100, unique=True)),
                ('localizacao', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('operacional', 'Operacional'), ('com_defeito', 'Com Defeito'), ('offline', 'Offline')], default='operacional', max_length=50)),
                ('ultima_manutencao', models.DateField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Dispositivo de Segurança',
                'verbose_name_plural': 'Dispositivos de Segurança',
            },
        ),
        migrations.CreateModel(
            name='Equipamento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('descricao', models.TextField(blank=True, null=True)),
                ('numero_serie', models.CharField(max_length=100, unique=True)),
                ('localizacao', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('ativo', 'Ativo'), ('manutencao', 'Em Manutenção'), ('inativo', 'Inativo')], default='ativo', max_length=50)),
                ('data_aquisicao', models.DateField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Equipamento',
                'verbose_name_plural': 'Equipamentos',
            },
        ),
        migrations.CreateModel(
            name='Veiculo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('modelo', models.CharField(max_length=255)),
                ('placa', models.CharField(max_length=10, unique=True)),
                ('ano', models.IntegerField()),
                ('quilometragem', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('disponivel', 'Disponível'), ('em_uso', 'Em Uso'), ('manutencao', 'Em Manutenção')], default='disponivel', max_length=50)),
                ('data_aquisicao', models.DateField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Veículo',
                'verbose_name_plural': 'Veículos',
            },
        ),
    ]
