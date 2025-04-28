import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { atualizarQuantidade } from '../../services/api';

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

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityValue = styled.div`
  background-color: #232631;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  margin-right: 12px;
  min-width: 60px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const AddButton = styled(Button)`
  background-color: #00C853;
  color: white;
`;

const RemoveButton = styled(Button)`
  background-color: #FF5252;
  color: white;
`;

const StockQuantity = () =>
{
  const [quantity, setQuantity] = useState(43);
  const [loading, setLoading] = useState(false);

  // ID da ação PETR4 (fixo para o protótipo)
  const acaoId = 1;

  const handleIncrement = async () =>
  {
    setLoading(true);
    try
    {
      const novaQuantidade = quantity + 1;
      setQuantity(novaQuantidade);
      await atualizarQuantidade(acaoId, novaQuantidade);
    } catch (error)
    {
      console.error('Erro ao atualizar quantidade:', error);
      // Reverter para o valor anterior em caso de erro
      setQuantity(quantity);
    } finally
    {
      setLoading(false);
    }
  };

  const handleDecrement = async () =>
  {
    if (quantity > 0)
    {
      setLoading(true);
      try
      {
        const novaQuantidade = quantity - 1;
        setQuantity(novaQuantidade);
        await atualizarQuantidade(acaoId, novaQuantidade);
      } catch (error)
      {
        console.error('Erro ao atualizar quantidade:', error);
        // Reverter para o valor anterior em caso de erro
        setQuantity(quantity);
      } finally
      {
        setLoading(false);
      }
    }
  };

  // Carregar quantidade inicial da API
  useEffect(() =>
  {
    // Já carregada pelo estado inicial, mas em um cenário real, carregaríamos da API aqui
  }, []);

  return (
    <Container>
      <Title>Quantidade</Title>
      <QuantityContainer>
        <QuantityValue>{quantity}</QuantityValue>
        <ButtonContainer>
          <AddButton onClick={handleIncrement} disabled={loading}>+</AddButton>
          <RemoveButton onClick={handleDecrement} disabled={loading || quantity <= 0}>-</RemoveButton>
        </ButtonContainer>
      </QuantityContainer>
    </Container>
  );
};

export default StockQuantity; 