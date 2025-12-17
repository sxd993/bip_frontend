import { client } from '../../../../shared/api/client';

export const loginApi = async (data) => {
    const response = await client.post('/auth/login', data);
    return response.data;
};

export const logoutApi = async () => {
    const response = await client.post('/auth/logout');
    return response.data;
};
