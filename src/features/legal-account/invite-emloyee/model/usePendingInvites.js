import { useQuery } from '@tanstack/react-query';
import { getPendingInvitesRequest } from '../api/getPendingInvites';

export const usePendingInvites = ({ enabled } = {}) => {
  return useQuery({
    queryKey: ['companyInvites'],
    queryFn: getPendingInvitesRequest,
    enabled
  });
};
