import { client } from '../../../shared/api/client';

// Существующий API
export const getDealsApi = async () => {
    const response = await client.get('/deals/deals/get-deals');
    return response.data;
}

// Новые API для обращений
export const createAppealApi = async (data) => {
    const response = await client.post('/deals/create/create-deal', data);
    return response.data;
};


// API для получения воронок и стадий
export const getDealStagesApi = async () => {
    const response = await client.get('/deals/create/get-scenarios');
    return response.data;
};