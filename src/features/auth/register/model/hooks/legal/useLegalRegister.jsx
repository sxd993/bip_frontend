import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { registerLegalApi } from '@features/auth/register/api/registerApi';
import { normalizePhoneForServer } from '@shared/utils/formatters';
import { getUser } from '@/entities/business/user/api/userApi';

export const useLegalRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerLegalApi,
    onSuccess: async () => {
      try {
        const userData = await getUser();
        queryClient.setQueryData(['user'], userData);
      } catch (error) {
        console.error('Не удалось обновить данные пользователя после регистрации', error);
      }

      navigate('/personal-account', { replace: true });
    },
  });

  const onSubmit = (formData) => {
    const normalizedData = {
      ...formData,
      phone: normalizePhoneForServer(formData.phone),
    };

    mutation.mutate(normalizedData);
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
