import { useUser } from "@/entities/user/model/useUser";
import { useLogout } from "@/entities/user/model/useLogout";

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