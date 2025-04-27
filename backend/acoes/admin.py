from django.contrib import admin
from .models import Acao, ObservacaoAcao

@admin.register(Acao)
class AcaoAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'quantidade')
    search_fields = ('ticker',)

@admin.register(ObservacaoAcao)
class ObservacaoAcaoAdmin(admin.ModelAdmin):
    list_display = ('acao', 'texto')
    list_filter = ('acao',)
    search_fields = ('texto',)
