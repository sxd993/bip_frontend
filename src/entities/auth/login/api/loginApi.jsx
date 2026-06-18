import { client } from '@/shared/api/client';

export const loginApi = async (data) => {
  const response = await client.post('/auth/login', data);
  return response.data;
};
