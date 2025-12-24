import { useLogout } from '@/entities/business/user/model/useLogout';
import { useUser } from '@/entities/business/user/model/useUser';

// Хук для управления авторизацией в header
export const useAuthActions = () => {
  const { user } = useUser();
  const { logoutMutation } = useLogout();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return {
    user,
    handleLogout,
  };
};