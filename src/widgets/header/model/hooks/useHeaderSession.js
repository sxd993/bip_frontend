import { useUser } from '@/entities/auth';
import { formatFullNameShort } from '@/shared/lib/formatFullNameShort';
import { formatBalance } from '@/shared/utils/formatters';

export const useHeaderSession = () => {
  const { user, isLoading } = useUser();

  const isAuthorized = Boolean(user);
  const accountHref = isAuthorized ? '/personal-account' : '/auth/login';
  const accountLabel = isAuthorized
    ? formatFullNameShort(user) ?? 'Личный кабинет'
    : 'Личный кабинет';
  const balanceLabel = isAuthorized ? formatBalance(user.balance) : null;

  return {
    isSessionLoading: isLoading,
    isAuthorized,
    accountHref,
    accountLabel,
    balanceLabel,
  };
};
