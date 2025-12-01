import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/loginApi';
import { getUser } from '../../../entities/user/api/userApi';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      try {
        const userData = await getUser();
        queryClient.setQueryData(['user'], userData);
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
      }
      navigate('/personal-account');
    },
  });

  const login = (credentials) => mutation.mutate(credentials);

  return {
    login,
    isPending: mutation.isPending,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
  };
};