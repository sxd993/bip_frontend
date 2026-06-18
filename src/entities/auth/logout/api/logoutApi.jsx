import { client } from '@/shared/api/client';

export const logoutApi = async () => {
  const response = await client.post('/auth/logout');
  return response.data;
};
