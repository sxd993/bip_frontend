import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePhysicalPersonApi, updateEmployeeDataApi } from '../../../shared/api/account/updateApi';

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

export const useEditEmployeeData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEmployeeDataApi,
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