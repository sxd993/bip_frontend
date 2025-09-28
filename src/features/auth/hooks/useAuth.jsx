import { useQueryClient, useMutation } from '@tanstack/react-query';
import { loginApi } from '../../../shared/api/auth/loginApi';
import { normalizePhoneForServer } from '../../../shared/utils/formatters';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerMutation = async (registerFn, payload) => {
    const normalizedPayload = {
      ...payload,
      phone: normalizePhoneForServer(payload.phone),
    };
    
    await registerFn(normalizedPayload);
    loginMutation.mutate({
      email_or_phone: normalizedPayload.phone,
      password: normalizedPayload.password,
    });
  };

  return {
    // Состояния для логина
    loginMutation,
    loginError: loginMutation.error,
    isLoginPending: loginMutation.isPending,

    // Состояния для регистрации
    registerMutation,
  };
};