import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from '../api/sessionApi';

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['user'],
      queryFn: getUser,
      staleTime: 1000 * 60 * 30,
    });
  }, [queryClient]);
};
