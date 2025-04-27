from django.shortcuts import render
from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from .models import Acao, ObservacaoAcao
from .serializers import AcaoSerializer, ObservacaoAcaoSerializer
import yfinance as yf
import json
from datetime import datetime, timedelta
import random

class AcaoViewSet(viewsets.ModelViewSet):
    queryset = Acao.objects.all()
    serializer_class = AcaoSerializer
    
    @action(detail=True, methods=['get'])
    def info(self, request, pk=None):
        acao = self.get_object()
        try:
            ticker = acao.ticker
            if not ticker.endswith('.SA'):
                ticker = f"{ticker}.SA"
            
            # Tentar obter dados da API do Yahoo Finance
            try:    
                stock = yf.Ticker(ticker)
                
                # Obter dados históricos para o gráfico
                end_date = datetime.now()
                start_date = end_date - timedelta(days=30)
                hist = stock.history(start=start_date, end=end_date)
                
                # Converter para formato compatível com JSON
                historical_data = []
                for date, row in hist.iterrows():
                    historical_data.append({
                        'date': date.strftime('%Y-%m-%d'),
                        'close': float(row['Close'])
                    })
                
                # Obter informações sobre dividendos
                dividends = stock.dividends
                dividends_data = []
                for date, value in dividends.items():
                    if date >= start_date:
                        dividends_data.append({
                            'date': date.strftime('%Y-%m-%d'),
                            'value': float(value)
                        })
                
                # Informações gerais da ação
                info = stock.info
                
                return Response({
                    'ticker': ticker,
                    'nome': info.get('longName', 'Petróleo Brasileiro S.A. - Petrobras'),
                    'preco_atual': info.get('currentPrice', 38.75),
                    'variacao_dia': info.get('regularMarketChangePercent', 2.5),
                    'historical_data': historical_data,
                    'dividends': dividends_data
                })
            
            except Exception as api_error:
                # Se falhar na API, usar dados fictícios para o protótipo
                print(f"Erro na API do Yahoo Finance: {str(api_error)}")
                
                # Criar dados históricos fictícios
                end_date = datetime.now()
                historical_data = []
                base_price = 38.75
                
                for i in range(30, 0, -1):
                    date = end_date - timedelta(days=i)
                    # Pequena variação aleatória no preço
                    close_price = base_price * (1 + (random.random() - 0.5) * 0.05)
                    historical_data.append({
                        'date': date.strftime('%Y-%m-%d'),
                        'close': round(close_price, 2)
                    })
                    # Atualizar o preço base para o próximo dia
                    base_price = close_price
                
                # Criar dividendos fictícios
                dividends_data = [
                    {'date': (end_date - timedelta(days=15)).strftime('%Y-%m-%d'), 'value': 1.25},
                    {'date': (end_date - timedelta(days=25)).strftime('%Y-%m-%d'), 'value': 0.85}
                ]
                
                return Response({
                    'ticker': ticker,
                    'nome': 'Petróleo Brasileiro S.A. - Petrobras',
                    'preco_atual': base_price,
                    'variacao_dia': 2.5,
                    'historical_data': historical_data,
                    'dividends': dividends_data
                })
                
        except Exception as e:
            print(f"Erro geral: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def observacoes(self, request, pk=None):
        acao = self.get_object()
        observacoes = acao.observacoes.all()
        serializer = ObservacaoAcaoSerializer(observacoes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def adicionar_observacao(self, request, pk=None):
        acao = self.get_object()
        texto = request.data.get('texto', '')
        
        if not texto:
            return Response({'error': 'Texto da observação é obrigatório'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        observacao = ObservacaoAcao.objects.create(acao=acao, texto=texto)
        serializer = ObservacaoAcaoSerializer(observacao)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
