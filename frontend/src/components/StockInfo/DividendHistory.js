import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Container = styled.div`
  background-color: #171A23;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 20px;
  color: #FFFFFF;
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const CustomTooltip = styled.div`
  background-color: #232631;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 4px;
  color: white;
`;

const DividendHistory = () =>
{
  // Dados com valores quebrados para o histograma
  const data = [
    { x: '0.25', frequency: 1.5 },
    { x: '0.75', frequency: 2.3 },
    { x: '1.25', frequency: 3.2 },
    { x: '1.75', frequency: 4.7 },
    { x: '2.25', frequency: 3.5 },
    { x: '2.75', frequency: 2.8 },
    { x: '3.25', frequency: 2.1 },
    { x: '3.75', frequency: 0.9 }
  ];

  const renderTooltip = ({ active, payload }) =>
  {
    if (active && payload && payload.length)
    {
      return (
        <CustomTooltip>
          <p>{`Valor: R$ ${payload[0].payload.x}`}</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <Container>
      <Title>Histórico de Proventos</Title>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis
              dataKey="x"
              stroke="#999"
              tickFormatter={(value) => `R$${value}`}
            />
            <YAxis stroke="#999" />
            <Tooltip content={renderTooltip} />
            <Bar dataKey="frequency" fill="#FF5722" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
};

export default DividendHistory; 