import { client } from '@/shared/api/client';

export const registerPhysicalApi = async (data) => {
  const response = await client.post('/auth/register/physical', data);
  return response.data;
};

export const registerLegalApi = async (data) => {
  const response = await client.post('/auth/register/legal', data);
  return response.data;
};
