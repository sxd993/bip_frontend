import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { confirmRegistrationPrecheck } from '../../register/api/registerApi';
import { getUser } from '../../../entities/user/api/userApi';

export const useConfirmRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: confirmRegistrationPrecheck,
    onSuccess: async () => {
      try {
        const userData = await getUser();
        queryClient.setQueryData(['user'], userData);
      } catch (error) {
        console.error('Не удалось обновить данные пользователя после регистрации', error);
      }

      navigate('/personal-account');
    },
  });

  const confirmRegistration = async (code) => {
    return mutation.mutateAsync({
      code,
    });
  };

  return {
    confirmRegistration,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};
