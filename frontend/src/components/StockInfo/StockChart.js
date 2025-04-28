import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartContainer = styled.div`
  background-color: #171A23;
  border-radius: 10px;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 5px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #FFFFFF;
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: 10px;
`;

const TimeframeButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.$active ? '#232631' : '#171A23'};
  color: white;
  cursor: pointer;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: #232631;
  }
`;

const ChartContent = styled.div`
  height: 300px;
`;

const CustomTooltip = styled.div`
  background-color: #232631;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 4px;
  color: white;
`;

const TooltipDate = styled.p`
  font-weight: bold;
  margin: 0 0 5px;
`;

const TooltipPrice = styled.p`
  margin: 0;
`;

const StockChart = ({ data }) =>
{
    const [timeframe, setTimeframe] = useState('30 dias');

    // Determinar se o gráfico deve ser vermelho ou verde com base nos preços
    const { chartColor, isPositive } = useMemo(() =>
    {
        if (!data || data.length < 2)
        {
            return { chartColor: '#00C853', isPositive: true };
        }

        const firstPrice = data[0].close;
        const lastPrice = data[data.length - 1].close;
        const priceChange = lastPrice - firstPrice;

        return {
            chartColor: priceChange >= 0 ? '#00C853' : '#e60111',
            isPositive: priceChange >= 0
        };
    }, [data]);

    const formatDate = (date) =>
    {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('pt-BR');
    };

    const formatCurrency = (value) =>
    {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const CustomTooltipContent = ({ active, payload, label }) =>
    {
        if (active && payload && payload.length)
        {
            return (
                <CustomTooltip>
                    <TooltipDate>{formatDate(label)}</TooltipDate>
                    <TooltipPrice>Valor: {formatCurrency(payload[0].value)}</TooltipPrice>
                </CustomTooltip>
            );
        }
        return null;
    };

    return (
        <ChartContainer>
            <ChartHeader>
                <ChartTitle>Histórico de Preços</ChartTitle>
                <TimeframeSelector>
                    <TimeframeButton
                        $active={timeframe === '5 dias'}
                        onClick={() => setTimeframe('5 dias')}
                    >
                        5 dias
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === '30 dias'}
                        onClick={() => setTimeframe('30 dias')}
                    >
                        30 dias
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === '1 ano'}
                        onClick={() => setTimeframe('1 ano')}
                    >
                        1 ano
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === 'Max.'}
                        onClick={() => setTimeframe('Max.')}
                    >
                        Max.
                    </TimeframeButton>
                </TimeframeSelector>
            </ChartHeader>
            <ChartContent>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tickMargin={10}
                            stroke="#999"
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => formatCurrency(value)}
                            axisLine={false}
                            stroke="#999"
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke={chartColor}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContent>
        </ChartContainer>
    );
};

export default StockChart; 