import { client } from '@/shared/api/client';

export const createTopUpApi = async (amount) => {
  const response = await client.post('/payments/top-up', { amount });
  return response.data;
};

export const getPaymentStatusApi = async (paymentId) => {
  const response = await client.get(`/payments/${paymentId}/status`);
  return response.data;
};
