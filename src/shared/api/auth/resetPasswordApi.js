import { client } from '../client';

export const resetPasswordApi = {
  forgotPassword: (email) => 
    client.post('/auth/forgot-password', { email }),
};