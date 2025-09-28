import { useQueryClient, useMutation } from '@tanstack/react-query';
import { loginApi } from '../../../shared/api/auth/loginApi';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../shared/api/account/userApi';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
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

  const registerMutation = useMutation({
    mutationFn: ({ registerFn, payload }) => registerFn(payload),
    onSuccess: (data) => {
      // Если бэк возвращает пользователя после регистрации
      if (data?.user) {
        queryClient.setQueryData(['user'], data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate('/personal-account');
      }
      // Если нет - показываем success экран без редиректа
    },
  });

  return {
    // Логин
    loginMutation,
    loginError: loginMutation.error,
    isLoginPending: loginMutation.isPending,

    // Регистрация
    registerMutation,
    registerError: registerMutation.error?.response?.data?.error,
    isRegisterPending: registerMutation.isPending,
  };
};
