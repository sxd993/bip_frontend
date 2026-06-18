import { useLogout } from '@/features/auth';
import { useHeaderSession } from './useHeaderSession';

export const useHeaderLogoutButton = (onNavigate) => {
  const { isSessionLoading, isAuthorized } = useHeaderSession();
  const { logoutMutation } = useLogout();

  const isVisible = !isSessionLoading && isAuthorized;

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        onNavigate?.();
      },
    });
  };

  return {
    isVisible,
    handleLogout,
    isPending: logoutMutation.isPending,
  };
};
