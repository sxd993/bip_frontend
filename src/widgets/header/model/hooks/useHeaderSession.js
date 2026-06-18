import { useUser } from '@/entities/auth';
import { formatFullNameShort } from '@/shared/lib/formatFullNameShort';
import { formatBalance } from '@/shared/utils/formatters';

const getUserBalance = (user) => {
  if (user.user_type === 'legal' && user.company?.balance != null) {
    return user.company.balance;
  }

  return user.balance;
};

export const useHeaderSession = () => {
  const { user, isLoading } = useUser();

  const isAuthorized = Boolean(user);
  const accountHref = isAuthorized ? '/personal-account' : '/auth/login';
  const accountLabel = isAuthorized
    ? formatFullNameShort(user) ?? 'Личный кабинет'
    : 'Личный кабинет';
  const balanceLabel = isAuthorized ? formatBalance(getUserBalance(user)) : null;

  return {
    isSessionLoading: isLoading,
    isAuthorized,
    accountHref,
    accountLabel,
    balanceLabel,
  };
};
