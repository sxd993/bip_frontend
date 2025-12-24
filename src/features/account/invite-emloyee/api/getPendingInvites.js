import { client } from "@/shared/api/client";


export const getPendingInvitesRequest = async () => {
  const response = await client.get('/personal_account/company/invites');
  return response.data;
};
