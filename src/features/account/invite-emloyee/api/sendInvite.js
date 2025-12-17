import { client } from '../../../shared/api/client';

export const sendInviteRequest = async (payload) => {
  const response = await client.post('/personal_account/company/invite', payload);
  return response.data;
};
