import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { addObservacao, fetchObservacoes, atualizarObservacao, deletarObservacao } from '../../services/api';

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

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  background-color: #232631;
  color: #FFFFFF;
  
  &:focus {
    outline: none;
    border-color: #FF5722;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const StockObservations = ({ acaoId }) =>
{
  const [texto, setTexto] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [observacaoAtual, setObservacaoAtual] = useState(null);
  const timeoutRef = useRef(null);

  // Buscar observações existentes
  useEffect(() =>
  {
    const fetchObservacaoAtual = async () =>
    {
      try
      {
        const observacoes = await fetchObservacoes(acaoId);
        // Ignorar a observação padrão sobre a Petrobras
        const observacoesFiltradas = observacoes.filter(
          obs => obs.texto !== 'Ação da Petrobras com forte presença no mercado brasileiro. Pagamento de dividendos consistente.'
        );

        // Se houver outras observações, pegar a mais recente
        if (observacoesFiltradas.length > 0)
        {
          const ultimaObservacao = observacoesFiltradas[0];
          setObservacaoAtual(ultimaObservacao);
          setTexto(ultimaObservacao.texto);
        }
      } catch (error)
      {
        console.error('Erro ao buscar observações:', error);
      }
    };

    fetchObservacaoAtual();
  }, [acaoId]);

  // Função para salvar a observação após um tempo sem digitar
  const salvarObservacao = async (text) =>
  {
    if (!text.trim()) return;

    try
    {
      if (observacaoAtual)
      {
        // Atualizar a observação existente
        const observacaoAtualizada = await atualizarObservacao(observacaoAtual.id, text);
        setObservacaoAtual(observacaoAtualizada);
      } else
      {
        // Criar uma nova observação
        const novaObservacao = await addObservacao(acaoId, text);
        setObservacaoAtual(novaObservacao);
      }
    } catch (error)
    {
      console.error('Erro ao salvar observação:', error);
    }
  };

  // Configura um temporizador para salvar a observação
  useEffect(() =>
  {
    if (isTyping)
    {
      if (timeoutRef.current)
      {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() =>
      {
        salvarObservacao(texto);
        setIsTyping(false);
      }, 1500); // Salvar 1.5 segundos após parar de digitar
    }

    return () =>
    {
      if (timeoutRef.current)
      {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [texto, isTyping, acaoId, observacaoAtual]);

  const handleTextChange = (e) =>
  {
    setTexto(e.target.value);
    setIsTyping(true);
  };

  return (
    <Container>
      <Title>Observações</Title>

      <TextArea
        value={texto}
        onChange={handleTextChange}
        placeholder="Digite observações sobre a AÇÃO4"
      />
    </Container>
  );
};

export default StockObservations; 