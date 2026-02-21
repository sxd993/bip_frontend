import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { prefetchAppealCategories } from '../features/create-appeal/utils/prefetch';
import { LegalAccount } from '@/widgets/legal-account';
import { PhysicalAccount } from '../features/view-account/physical/components/PhysicalAccount';
import { useUser } from '@/entities/business/user/model/useUser';

export const Account = () => {
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
        <LegalAccount />
      ) : (
        <PhysicalAccount user={user} isLoading={userLoading} />
      )}
    </div>
  );
};
