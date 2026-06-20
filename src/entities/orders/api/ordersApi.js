import { client } from '@/shared/api/client';

export const getCurrentOrderApi = async () => {
  try {
    const response = await client.get('/orders/current');
    return response.data.order ?? null;
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};

export const payOrderApi = async (orderId) => {
  const response = await client.post(`/orders/${orderId}/pay`);
  return response.data;
};
