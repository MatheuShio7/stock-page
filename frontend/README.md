# Frontend do Protótipo da Página de Ações

Este é o frontend para o protótipo da página de informações da ação PETR4, desenvolvido com React.

## Requisitos

- Node.js 14+
- npm ou yarn

## Estrutura do Projeto

- `src/components/` - Componentes reutilizáveis
- `src/layouts/` - Layouts da aplicação
- `src/pages/` - Páginas da aplicação
- `src/services/` - Serviços para comunicação com a API

## Componentes principais

- `Sidebar` - Menu lateral de navegação
- `Header` - Cabeçalho com botão de voltar para carteira
- `StockHeader` - Informações básicas da ação (ticker, nome, preço)
- `StockChart` - Gráfico com histórico de preços
- `DividendHistory` - Tabela com histórico de proventos
- `StockObservations` - Componente para adicionar e visualizar observações

## Configuração

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor de desenvolvimento:

```
npm start
```

O frontend estará disponível em: http://localhost:3000

## Funcionalidades

- Visualização das informações da ação PETR4
- Gráfico de preços históricos
- Visualização de proventos
- Adição e visualização de observações

## Observações

- Este é um protótipo simplificado que carrega apenas a ação PETR4
- Os botões do menu lateral são apenas visuais, sem funcionalidade real
- O botão "Voltar para Carteira" não tem funcionalidade real
- A interface foi simplificada, removendo o roteamento para facilitar o protótipo
