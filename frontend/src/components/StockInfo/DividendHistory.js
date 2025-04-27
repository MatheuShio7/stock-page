import React from 'react';
import styled from 'styled-components';

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #F7F9FC;
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: bold;
  color: #5A6A7A;
  border-bottom: 1px solid #E0E0E0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:hover {
    background-color: #F7F9FC;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #E0E0E0;
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: #5A6A7A;
`;

const DividendHistory = ({ dividends }) =>
{
    const formatDate = (dateString) =>
    {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const formatCurrency = (value) =>
    {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }).format(value);
    };

    return (
        <Container>
            <Title>Histórico de Proventos</Title>

            {dividends && dividends.length > 0 ? (
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHeaderCell>Data</TableHeaderCell>
                            <TableHeaderCell>Tipo</TableHeaderCell>
                            <TableHeaderCell>Valor</TableHeaderCell>
                            <TableHeaderCell>Total</TableHeaderCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dividends.map((dividend, index) => (
                            <TableRow key={index}>
                                <TableCell>{formatDate(dividend.date)}</TableCell>
                                <TableCell>Dividendo</TableCell>
                                <TableCell>{formatCurrency(dividend.value)}</TableCell>
                                <TableCell>R$ 0,00</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <EmptyMessage>Não há proventos recentes para esta ação.</EmptyMessage>
            )}
        </Container>
    );
};

export default DividendHistory; 