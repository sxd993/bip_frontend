import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { normalizePhoneForServer } from '@shared/utils/formatters';
import { registerPhysicalApi } from '@features/auth/register/api/registerApi';
import { getUser } from '@/entities/business/user/api/userApi';

export const usePhysicalRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: registerPhysicalApi,
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
