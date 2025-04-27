import React, { useState } from 'react';
import styled from 'styled-components';
import { addObservacao } from '../../services/api';

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 20px;
`;

const ObservationForm = styled.form`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 10px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #2E7DD1;
  }
`;

const SubmitButton = styled.button`
  background-color: #2E7DD1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #1E6CB8;
  }
  
  &:disabled {
    background-color: #A0AEC0;
    cursor: not-allowed;
  }
`;

const ObservationsList = styled.div`
  margin-top: 20px;
`;

const ObservationItem = styled.div`
  border-bottom: 1px solid #E0E0E0;
  padding: 15px 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ObservationText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const EmptyMessage = styled.div`
  padding: 20px 0;
  text-align: center;
  color: #5A6A7A;
`;

const StockObservations = ({ acaoId, observacoes, onObservacaoAdded }) =>
{
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (!texto.trim()) return;

        setLoading(true);
        try
        {
            const novaObservacao = await addObservacao(acaoId, texto);
            onObservacaoAdded(novaObservacao);
            setTexto('');
        } catch (error)
        {
            console.error('Erro ao adicionar observação:', error);
            alert('Erro ao adicionar observação. Tente novamente.');
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Title>Observações</Title>

            <ObservationForm onSubmit={handleSubmit}>
                <TextArea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Adicione uma observação sobre esta ação..."
                />
                <SubmitButton type="submit" disabled={!texto.trim() || loading}>
                    {loading ? 'Enviando...' : 'Adicionar Observação'}
                </SubmitButton>
            </ObservationForm>

            <ObservationsList>
                {observacoes && observacoes.length > 0 ? (
                    observacoes.map((obs) => (
                        <ObservationItem key={obs.id}>
                            <ObservationText>{obs.texto}</ObservationText>
                        </ObservationItem>
                    ))
                ) : (
                    <EmptyMessage>Nenhuma observação registrada para esta ação.</EmptyMessage>
                )}
            </ObservationsList>
        </Container>
    );
};

export default StockObservations; 