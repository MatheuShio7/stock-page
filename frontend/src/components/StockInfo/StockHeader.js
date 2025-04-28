import React from 'react';
import styled from 'styled-components';

const StockHeaderContainer = styled.div`
  margin-bottom: 15px;
  margin-top: -30px;
`;

const StockTitle = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Ticker = styled.h1`
  font-size: 100px;
  font-weight: bold;
  color: #171A23;
`;

const StockPrice = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentPrice = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-right: 15px;
  color: #FFFFFF;
`;

const PriceChange = styled.div`
  font-size: 16px;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: ${props => props.$isPositive ? '#1A3A29' : '#3A1A1A'};
  color: ${props => props.$isPositive ? '#00C853' : '#FF5252'};
  display: flex;
  align-items: center;
`;

const Arrow = styled.span`
  margin-right: 5px;
`;

const StockHeader = ({ ticker, price, changePercent }) =>
{
  // Garantir que temos valores válidos
  const safePrice = price || 0;
  const safeChange = changePercent || 0;

  const isPositive = safeChange >= 0;
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(safePrice);

  const formattedChange = safeChange.toFixed(2);

  return (
    <StockHeaderContainer>
      <StockTitle>
        <Ticker>{ticker}</Ticker>
      </StockTitle>
      <StockPrice>
        <CurrentPrice>{formattedPrice}</CurrentPrice>
        <PriceChange $isPositive={isPositive}>
          <Arrow>{isPositive ? '▲' : '▼'}</Arrow>
          {formattedChange}%
        </PriceChange>
      </StockPrice>
    </StockHeaderContainer>
  );
};

export default StockHeader; 