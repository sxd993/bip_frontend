import { useMutation } from '@tanstack/react-query';
import { sendInviteRequest } from '../api/sendInvite';

export const useInviteEmployee = (options = {}) => {
  return useMutation({
    mutationFn: sendInviteRequest,
    ...options
  });
};
