import { client } from '@/shared/api/client';

export const getCompanyInfoApi = async () => {
  const response = await client.get('/personal_account/company/info');
  return response.data;
};
