import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchAcoes = async () =>
{
    try
    {
        const response = await api.get('/acoes/');
        return response.data;
    } catch (error)
    {
        console.error('Erro ao buscar ações:', error);
        throw error;
    }
};

export const fetchAcaoById = async (id) =>
{
    try
    {
        const response = await api.get(`/acoes/${id}/`);
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao buscar ação com ID ${id}:`, error);
        throw error;
    }
};

export const fetchAcaoInfo = async (id) =>
{
    try
    {
        const response = await api.get(`/acoes/${id}/info/`);
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao buscar informações da ação com ID ${id}:`, error);
        throw error;
    }
};

export const fetchObservacoes = async (id) =>
{
    try
    {
        const response = await api.get(`/acoes/${id}/observacoes/`);
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao buscar observações da ação com ID ${id}:`, error);
        throw error;
    }
};

export const addObservacao = async (id, texto) =>
{
    try
    {
        const response = await api.post(`/acoes/${id}/adicionar_observacao/`, { texto });
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao adicionar observação à ação com ID ${id}:`, error);
        throw error;
    }
};

export const atualizarQuantidade = async (id, quantidade) =>
{
    try
    {
        const response = await api.patch(`/acoes/${id}/`, { quantidade });
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao atualizar quantidade da ação com ID ${id}:`, error);
        throw error;
    }
};

export const deletarObservacao = async (id) =>
{
    try
    {
        const response = await api.delete(`/observacoes/${id}/delete/`);
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao deletar observação com ID ${id}:`, error);
        throw error;
    }
};

export const atualizarObservacao = async (id, texto) =>
{
    try
    {
        const response = await api.put(`/observacoes/${id}/`, { texto });
        return response.data;
    } catch (error)
    {
        console.error(`Erro ao atualizar observação com ID ${id}:`, error);
        throw error;
    }
}; 