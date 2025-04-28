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

1. Navegue até a pasta frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

O frontend estará disponível em: http://localhost:3000/

## Tecnologias Utilizadas

- **Backend**: Django, Django REST Framework, BeautifulSoup4 para web scraping
- **Frontend**: React, Styled Components, Recharts

## Recursos

- Visualização em tempo real dos dados da ação PETR4 obtidos via web scraping do Google Finance
- Gráficos interativos para histórico de preços (dados simulados para o protótipo)
- Tabela de proventos (dados simulados para o protótipo)
- Sistema de observações para registrar análises sobre a ação

## API Endpoints

- `GET /api/acoes/` - Lista todas as ações
- `GET /api/acoes/1/` - Detalhes da ação PETR4
- `GET /api/acoes/1/info/` - Informações detalhadas da ação (dados do Google Finance via web scraping)
- `GET /api/acoes/1/observacoes/` - Lista todas as observações da ação
- `POST /api/acoes/1/adicionar_observacao/` - Adiciona uma observação à ação 