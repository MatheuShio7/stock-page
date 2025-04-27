from django.core.management.base import BaseCommand
from acoes.models import Acao, ObservacaoAcao

class Command(BaseCommand):
    help = 'Cria a ação PETR4 no banco de dados para o protótipo'

    def handle(self, *args, **options):
        # Verifica se a ação já existe
        if not Acao.objects.filter(ticker='PETR4').exists():
            acao = Acao.objects.create(
                ticker='PETR4',
                quantidade=43
            )
            
            # Adiciona uma observação inicial
            ObservacaoAcao.objects.create(
                acao=acao,
                texto='Ação da Petrobras com forte presença no mercado brasileiro. Pagamento de dividendos consistente.'
            )
            
            self.stdout.write(self.style.SUCCESS('Ação PETR4 criada com sucesso!'))
        else:
            self.stdout.write(self.style.WARNING('A ação PETR4 já existe no banco de dados.')) 