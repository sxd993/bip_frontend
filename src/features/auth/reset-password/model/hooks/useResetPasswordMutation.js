import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../api/resetPasswordApi';

export const useResetPasswordMutation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = searchParams.get('token');

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // Очищаем кэш
      queryClient.clear();
      // Перенаправляем на страницу входа
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 1500);
    },
  });

  const resetPasswordAction = async (password) => {
    return mutation.mutateAsync({
      token,
      password,
    });
  };

  return {
    resetPasswordAction,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: mutation.error?.response?.data?.error || mutation.error?.message,
    token,
  };
};
