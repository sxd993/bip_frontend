import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerEmployeeApi, getUser } from '@/entities/auth';
import { normalizePhoneForServer } from '@shared/utils/formatters';

export const useEmployeeRegister = (companyToken) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerEmployeeApi,
    onSuccess: async () => {
      try {
        const userData = await getUser();
        queryClient.setQueryData(['user'], userData);
      } catch (error) {
        console.error(
          'Не удалось обновить данные пользователя после регистрации',
          error,
        );
      }

      navigate('/personal-account', { replace: true });
    },
  });

  const onSubmit = (formData) => {
    const { confirmPassword: _confirmPassword, ...rest } = formData;

    mutation.mutate({
      ...rest,
      phone: normalizePhoneForServer(formData.phone),
      company_token: companyToken,
      position: rest.position || null,
    });
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage:
      mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
