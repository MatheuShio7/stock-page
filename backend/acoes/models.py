from django.db import models

# Create your models here.

class Acao(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    quantidade = models.IntegerField(default=0)
    
    def __str__(self):
        return self.ticker

class ObservacaoAcao(models.Model):
    acao = models.ForeignKey(Acao, on_delete=models.CASCADE, related_name='observacoes')
    texto = models.TextField()
    
    def __str__(self):
        return f"Observação de {self.acao.ticker}"
