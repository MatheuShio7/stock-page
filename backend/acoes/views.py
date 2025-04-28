from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from .models import Acao, ObservacaoAcao
from .serializers import AcaoSerializer, ObservacaoAcaoSerializer
import requests
import json
from datetime import datetime, timedelta
import random
from bs4 import BeautifulSoup
import re

class AcaoViewSet(viewsets.ModelViewSet):
    queryset = Acao.objects.all()
    serializer_class = AcaoSerializer
    
    def _formatar_preco(self, texto_preco):
        """
        Converte o texto de preço em formato brasileiro para um float
        
        Exemplos:
        - "R$30,52" deve retornar 30.52
        - "R$3.052,25" deve retornar 3052.25
        """
        # Remover o símbolo de moeda
        texto = texto_preco.replace('R$', '').strip()
        
        # Verificar o formato
        if '.' in texto and ',' in texto:
            # Formato com separador de milhar e decimal (R$3.052,25)
            texto = texto.replace('.', '').replace(',', '.')
        elif ',' in texto:
            # Formato apenas com separador decimal (R$30,52)
            texto = texto.replace(',', '.')
            
        try:
            return float(texto)
        except ValueError:
            print(f"Erro ao converter preço: {texto_preco} -> {texto}")
            return 38.75  # Valor padrão caso falhe
            
    def _obter_dados_google_finance(self, ticker):
        """Obter dados da ação do Google Finance utilizando web scraping"""
        try:
            # Adicionar o sufixo :BVMF para ações da B3
            ticker_google = f"{ticker}:BVMF"
            
            # URL do Google Finance para a ação
            url = f"https://www.google.com/finance/quote/{ticker_google}"
            
            # Fazer a requisição HTTP
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Levantar exceção para erros HTTP
            
            # Parsear o HTML
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extrair o nome da empresa
            nome_elemento = soup.select_one('.zzDege')
            nome = nome_elemento.text if nome_elemento else 'Petróleo Brasileiro S.A. - Petrobras'
            
            # Extrair o preço atual
            preco_elemento = soup.select_one('.YMlKec.fxKbKc')
            preco_texto = preco_elemento.text if preco_elemento else 'R$38,75'
            
            # Converter o preço para float
            preco_atual = self._formatar_preco(preco_texto)
            
            # Debug para verificar o processamento do preço
            print(f"Preço original: {preco_texto} -> Preço convertido: {preco_atual}")
            
            # Extrair a variação percentual
            variacao_elemento = soup.select_one('.P2Luy.Ebnabc')
            if variacao_elemento:
                # Obter o texto e extrair apenas o número
                variacao_texto = variacao_elemento.text
                
                # Usar regex para extrair o número, considerando formato brasileiro (vírgula como decimal)
                match = re.search(r'([-+]?\d+[.,]\d+)%', variacao_texto)
                if match:
                    # Substituir vírgula por ponto e converter para float
                    variacao_dia = float(match.group(1).replace(',', '.'))
                    print(f"Variação original: {variacao_texto} -> Variação convertida: {variacao_dia}")
                else:
                    variacao_dia = 0.0
                    print(f"Não foi possível extrair variação de: {variacao_texto}")
            else:
                variacao_dia = 2.5
                print("Elemento de variação não encontrado, usando valor padrão")
            
            return {
                'nome': nome,
                'preco_atual': preco_atual,
                'variacao_dia': variacao_dia
            }
        except Exception as e:
            print(f"Erro ao obter dados do Google Finance: {str(e)}")
            return None
    
    def _gerar_dados_historicos(self, base_price):
        """Gerar dados históricos fictícios para a ação"""
        end_date = datetime.now()
        historical_data = []
        
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
        
        return historical_data, base_price
    
    def _gerar_dados_dividendos(self):
        """Gerar dados fictícios de dividendos"""
        end_date = datetime.now()
        return [
            {'date': (end_date - timedelta(days=15)).strftime('%Y-%m-%d'), 'value': 1.25},
            {'date': (end_date - timedelta(days=45)).strftime('%Y-%m-%d'), 'value': 0.85},
            {'date': (end_date - timedelta(days=75)).strftime('%Y-%m-%d'), 'value': 1.05}
        ]
    
    @action(detail=True, methods=['get'])
    def info(self, request, pk=None):
        acao = self.get_object()
        try:
            ticker = acao.ticker
            
            # Obter dados do Google Finance
            dados_google = self._obter_dados_google_finance(ticker)
            
            if dados_google:
                nome = dados_google['nome']
                preco_atual = dados_google['preco_atual']
                variacao_dia = dados_google['variacao_dia']
            else:
                # Usar dados padrão caso falhe
                nome = 'Petróleo Brasileiro S.A. - Petrobras'
                preco_atual = 38.75
                variacao_dia = 2.5
            
            # Gerar dados históricos
            historical_data, _ = self._gerar_dados_historicos(preco_atual)
            
            # Gerar dados de dividendos
            dividends_data = self._gerar_dados_dividendos()
            
            return Response({
                'ticker': ticker,
                'nome': nome,
                'preco_atual': preco_atual,
                'variacao_dia': variacao_dia,
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

@api_view(['PUT', 'PATCH'])
def atualizar_observacao(request, pk):
    observacao = get_object_or_404(ObservacaoAcao, pk=pk)
    texto = request.data.get('texto', '')
    
    if not texto:
        return Response({'error': 'Texto da observação é obrigatório'}, 
                        status=status.HTTP_400_BAD_REQUEST)
    
    observacao.texto = texto
    observacao.save()
    
    serializer = ObservacaoAcaoSerializer(observacao)
    return Response(serializer.data)

@api_view(['DELETE'])
def deletar_observacao(request, pk):
    observacao = get_object_or_404(ObservacaoAcao, pk=pk)
    observacao.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
