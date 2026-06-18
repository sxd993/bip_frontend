import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePhysicalPersonApi } from '@/entities/profile/physic';

export const useEditPersonalData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePhysicalPersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutation,
    isUpdating: mutation.isPending,
    updateError: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
