import { client } from '@/shared/api/client';

export const updatePhysicalPersonApi = async (data) => {
  const response = await client.put('/user/update-personal-info', data);
  return response.data;
};
