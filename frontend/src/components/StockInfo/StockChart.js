import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: 10px;
`;

const TimeframeButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.$active ? '#1E3A5F' : '#F0F0F0'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.$active ? '#1E3A5F' : '#E0E0E0'};
  }
`;

const ChartContent = styled.div`
  height: 300px;
`;

const CustomTooltip = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    const [timeframe, setTimeframe] = useState('1M');

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
                        $active={timeframe === '1S'}
                        onClick={() => setTimeframe('1S')}
                    >
                        1S
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === '1M'}
                        onClick={() => setTimeframe('1M')}
                    >
                        1M
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === '3M'}
                        onClick={() => setTimeframe('3M')}
                    >
                        3M
                    </TimeframeButton>
                    <TimeframeButton
                        $active={timeframe === '1A'}
                        onClick={() => setTimeframe('1A')}
                    >
                        1A
                    </TimeframeButton>
                </TimeframeSelector>
            </ChartHeader>
            <ChartContent>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tickMargin={10}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => formatCurrency(value)}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="close"
                            stroke="#2E7DD1"
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