import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '@/entities/auth';
import { clearUserSessionQueries } from '@/shared/lib/clearUserSessionQueries';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearUserSessionQueries(queryClient);
      queryClient.setQueryData(['user'], null);
      navigate('/auth/login');
    },
  });

  return { logoutMutation };
};
