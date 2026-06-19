import { client } from '@/shared/api/client';

export const getAppealDetailsApi = async (dealId) => {
  const response = await client.get(`/deals/appeal/get-appeal-details/${dealId}`);
  return response.data;
};

export const sendReplyApi = async (dealId, message, files = []) => {
  const response = await client.post('/deals/reply/send-reply', {
    dealId: String(dealId),
    message,
    files: files.map(({ name, base64, size }) => ({ name, base64, size })),
  });
  return response.data;
};

export const downloadFileApi = async (fileId) => {
  const response = await client.get(`/deals/files/download/${fileId}`, {
    responseType: 'blob',
  });
  return response.data;
};
