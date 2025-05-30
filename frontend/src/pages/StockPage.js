import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayout';
import StockHeader from '../components/StockInfo/StockHeader';
import StockChart from '../components/StockInfo/StockChart';
import DividendHistory from '../components/StockInfo/DividendHistory';
import StockObservations from '../components/StockInfo/StockObservations';
import StockQuantity from '../components/StockInfo/StockQuantity';
import { fetchAcaoById, fetchAcaoInfo, fetchObservacoes } from '../services/api';

const PageContainer = styled.div`
  max-width: 1200px;
`;

const WidgetRow = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

const WidgetColumn = styled.div`
  flex: 1;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
  color: #999;
`;

const ErrorMessage = styled.div`
  background-color: #3A1A1A;
  color: #FF5252;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
`;

const StockPage = () =>
{
    const [acao, setAcao] = useState(null);
    const [acaoInfo, setAcaoInfo] = useState(null);
    const [observacoes, setObservacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () =>
    {
        setLoading(true);
        setError(null);

        try
        {
            // Sempre carregar a ação com ID 1 (PETR4)
            const acaoData = await fetchAcaoById(1);
            setAcao(acaoData);

            const infoData = await fetchAcaoInfo(1);
            setAcaoInfo(infoData);

            const observacoesData = await fetchObservacoes(1);
            setObservacoes(observacoesData);
        } catch (err)
        {
            console.error('Erro ao carregar dados:', err);
            setError('Ocorreu um erro ao carregar os dados da ação. Por favor, tente novamente.');
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchData();
    }, []);

    const handleObservacaoAdded = (novaObservacao) =>
    {
        setObservacoes(prevObservacoes => [novaObservacao, ...prevObservacoes]);
    };

    if (loading)
    {
        return (
            <MainLayout>
                <LoadingMessage>Carregando informações da ação...</LoadingMessage>
            </MainLayout>
        );
    }

    if (error)
    {
        return (
            <MainLayout>
                <ErrorMessage>{error}</ErrorMessage>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <PageContainer>
                {acaoInfo && (
                    <>
                        <StockHeader
                            ticker={acaoInfo.ticker}
                            price={acaoInfo.preco_atual}
                            changePercent={acaoInfo.variacao_dia}
                        />

                        <StockChart data={acaoInfo.historical_data} />

                        <WidgetRow>
                            <WidgetColumn>
                                <DividendHistory dividends={acaoInfo.dividends} />
                            </WidgetColumn>
                            <WidgetColumn>
                                <StockQuantity />
                                <StockObservations
                                    acaoId={acao.id}
                                />
                            </WidgetColumn>
                        </WidgetRow>
                    </>
                )}
            </PageContainer>
        </MainLayout>
    );
};

export default StockPage; 