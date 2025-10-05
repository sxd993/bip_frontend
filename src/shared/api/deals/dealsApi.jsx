import { client } from '../client';

export const getDealsApi = async () => {
    const response = await client.get('/deals/get-deals');
    return response.data;
}

export const createAppealApi = async (data) => {
    const response = await client.post('/deals/create/create-deal', data);
    return response.data;
};

export const getDealStagesApi = async () => {
    const response = await client.get('/deals/create/get-scenarios');
    return response.data;
};
