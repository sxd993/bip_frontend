import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPendingOrdersApi, payOrderApi } from '@/entities/orders';

export const usePendingOrder = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['pendingOrder'],
    queryFn: getPendingOrdersApi,
    retry: false,
  });

  const payMutation = useMutation({
    mutationFn: payOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingOrder'] });
      queryClient.invalidateQueries({ queryKey: ['appeals'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const orders = ordersQuery.data ?? [];
  const lastPayOrderId = payMutation.variables ?? null;

  return {
    orders,
    order: orders[0] ?? null,
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    payOrder: payMutation.mutate,
    isPaying: payMutation.isPending,
    payError: payMutation.error,
    payingOrderId: payMutation.isPending ? lastPayOrderId : null,
    errorOrderId: payMutation.isError ? lastPayOrderId : null,
  };
};
