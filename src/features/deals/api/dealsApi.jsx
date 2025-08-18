import { client } from '../../../shared/api/client';

// Существующий API
export const getDealsApi = async () => {
    const response = await client.get('/deals/get-deals');
    return response.data;
}

// Новые API для обращений
export const createAppealApi = async (data) => {
    const response = await client.post('/deals/create', data);
    return response.data;
};

export const getCurrentDealsApi = async () => {
    const response = await client.get('/deals/current');
    return response.data;
};

export const getDealsHistoryApi = async () => {
    const response = await client.get('/deals/history');
    return response.data;
};

// API для получения воронок и стадий
export const getDealStagesApi = async () => {
    const response = await client.get('/deals/stages');
    return response.data;
};