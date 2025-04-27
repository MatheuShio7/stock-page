import React from 'react';
import styled from 'styled-components';

const StockHeaderContainer = styled.div`
  margin-bottom: 30px;
`;

const StockTitle = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Ticker = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-right: 12px;
  margin-bottom: 0;
`;

const Company = styled.h2`
  font-size: 18px;
  font-weight: normal;
  color: #5A6A7A;
  margin-bottom: 0;
`;

const StockPrice = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentPrice = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-right: 15px;
`;

const PriceChange = styled.div`
  font-size: 16px;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: ${props => props.$isPositive ? '#E6F7EB' : '#FEEEEE'};
  color: ${props => props.$isPositive ? '#1E8E3E' : '#D93025'};
  display: flex;
  align-items: center;
`;

const Arrow = styled.span`
  margin-right: 5px;
`;

const StockHeader = ({ ticker, name, price, changePercent }) =>
{
  const isPositive = changePercent >= 0;
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);

  const formattedChange = changePercent.toFixed(2);

  return (
    <StockHeaderContainer>
      <StockTitle>
        <Ticker>{ticker}</Ticker>
        <Company>{name}</Company>
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