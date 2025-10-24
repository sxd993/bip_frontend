import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePhysicalPersonApi, updateEmployeeDataApi, updateCompanyDataApi } from '../../../shared/api/account/updateApi';

export const useEditPersonalData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePhysicalPersonApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
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
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutation,
    isUpdating: mutation.isPending,
    updateError: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};

export const useEditCompanyData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCompanyDataApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['companyData']);
    },
  });

  return {
    ...mutation,
    isUpdating: mutation.isPending,
    updateError: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};