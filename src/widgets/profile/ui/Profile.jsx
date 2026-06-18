import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { prefetchAppealCategories } from '@/features/deal';
import { PhysicalAccount, CompanyAccount } from '@/features/profile';
import { useUser } from '@/entities/auth';

export const Profile = () => {
  const { user, isLoading: userLoading, error } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    prefetchAppealCategories(queryClient);
  }, [queryClient]);

  if (error) {
    return <div>Ошибка загрузки данных пользователя</div>;
  }

  return (
    <div>
      {user?.user_type === 'legal' ? (
        <CompanyAccount user={user} isLoading={userLoading} />
      ) : (
        <PhysicalAccount user={user} isLoading={userLoading} />
      )}
    </div>
  );
};
