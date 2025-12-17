import { client } from '../../../../shared/api/client';

export const forgotPassword = async (data) => {
  const response = await client.post('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await client.post('/auth/reset-password', data);
  return response.data;
};