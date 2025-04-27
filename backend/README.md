# Backend do Protótipo da Página de Ações

Este é o backend para o protótipo da página de informações de ações, especificamente para visualização da ação PETR4.

## Requisitos

- Python 3.10+
- Django 5.2
- Django REST Framework
- yfinance (para obter dados do Yahoo Finance)

## Configuração

1. Crie e ative um ambiente virtual:

```
python -m venv .venv
.venv\Scripts\activate  # Windows
```

2. Instale as dependências:

```
pip install -r requirements.txt
```

3. Execute as migrações:

```
python manage.py makemigrations
python manage.py migrate
```

4. Crie a ação PETR4 para o protótipo:

```
python manage.py cria_petr4
```

5. Crie um superusuário (opcional, para acessar o admin):

```
python manage.py createsuperuser
```

6. Inicie o servidor:

```
python manage.py runserver
```

## Endpoints da API

- `GET /api/acoes/` - Lista todas as ações
- `GET /api/acoes/1/` - Detalhes da ação PETR4
- `GET /api/acoes/1/info/` - Informações detalhadas da ação (dados do Yahoo Finance ou dados fictícios)
- `GET /api/acoes/1/observacoes/` - Lista todas as observações da ação
- `POST /api/acoes/1/adicionar_observacao/` - Adiciona uma observação à ação

## Observações

- Se a API do Yahoo Finance falhar, o sistema fornecerá dados fictícios para a ação PETR4
- O backend está configurado para funcionar exclusivamente como um protótipo e não para uso em produção

## Estrutura do Projeto

- `acoes/models.py` - Define os modelos Acao e ObservacaoAcao
- `acoes/views.py` - Contém a lógica da API, incluindo integração com Yahoo Finance
- `acoes/serializers.py` - Serializers para converter os modelos para JSON
- `acoes/urls.py` - Definição das rotas da API
- `acoes/management/commands/cria_petr4.py` - Comando para criar a ação PETR4 no banco de dados 