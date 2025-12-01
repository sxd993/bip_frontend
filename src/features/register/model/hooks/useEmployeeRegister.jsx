import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerEmployeeApi } from '../../api/registerApi';
import { normalizePhoneForServer } from '../../../../shared/utils/formatters';

export const useEmployeeRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerEmployeeApi,
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(['user'], data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate('/personal-account');
      }
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate({
      ...formData,
      phone: normalizePhoneForServer(formData.phone),
    });
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};