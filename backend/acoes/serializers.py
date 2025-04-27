from rest_framework import serializers
from .models import Acao, ObservacaoAcao

class ObservacaoAcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObservacaoAcao
        fields = ['id', 'texto']

class AcaoSerializer(serializers.ModelSerializer):
    observacoes = ObservacaoAcaoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Acao
        fields = ['id', 'ticker', 'quantidade', 'observacoes'] 