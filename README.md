# Protótipo da Página de Ações

Este projeto é um protótipo para visualização de informações da ação PETR4, com backend em Django e frontend em React.

## Estrutura do Projeto

- `backend/` - API Django para fornecer dados das ações
- `frontend/` - Interface em React

## Como Executar

### Backend

1. Navegue até a pasta backend:
   ```
   cd backend
   ```

2. Ative o ambiente virtual:
   ```
   .venv\Scripts\activate  # Windows
   ```

3. Execute as migrações:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Adicione a ação PETR4 ao banco de dados:
   ```
   python manage.py cria_petr4
   ```

5. Inicie o servidor:
   ```
   python manage.py runserver
   ```

O backend estará disponível em: http://localhost:8000/

### Frontend

O desenvolvimento do frontend será feito em uma próxima etapa, utilizando React para consumir a API do backend e implementar a interface conforme as imagens de referência.

## API Endpoints

- `GET /api/acoes/` - Lista todas as ações
- `GET /api/acoes/{id}/` - Detalhes de uma ação específica
- `GET /api/acoes/{id}/info/` - Informações detalhadas da ação (dados do Yahoo Finance)
- `GET /api/acoes/{id}/observacoes/` - Lista todas as observações de uma ação
- `POST /api/acoes/{id}/adicionar_observacao/` - Adiciona uma observação à ação 