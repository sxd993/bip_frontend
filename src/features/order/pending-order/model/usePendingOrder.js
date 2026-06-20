import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentOrderApi, payOrderApi } from '@/entities/orders';

export const usePendingOrder = () => {
  const queryClient = useQueryClient();

  const orderQuery = useQuery({
    queryKey: ['pendingOrder'],
    queryFn: getCurrentOrderApi,
    retry: false,
  });

  const payMutation = useMutation({
    mutationFn: payOrderApi,
    onSuccess: () => {
      queryClient.setQueryData(['pendingOrder'], null);
      queryClient.invalidateQueries({ queryKey: ['appeals'] });
    },
  });

  return {
    order: orderQuery.data ?? null,
    isLoading: orderQuery.isLoading,
    error: orderQuery.error,
    payOrder: payMutation.mutate,
    isPaying: payMutation.isPending,
    payError: payMutation.error,
  };
};
