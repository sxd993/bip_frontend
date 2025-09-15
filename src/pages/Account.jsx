import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '../shared/hooks/useUser';
import { useCompanyData, useCompanyEmployees } from '../shared/hooks/useCompanyData';
import { prefetchAppealCategories } from '../features/deals/utils/prefetch';
import { LegalAccount } from '../features/account/legal/components/LegalAccount';
import { PhysicalAccount } from '../features/account/physical/components/PhysicalAccount';
import { Loading } from '../shared/ui/Loading';

export const Account = () => {
  const { user, isLoading: userLoading, error } = useUser();
  const { data: companyData, isLoading: companyLoading } = useCompanyData();
  const { data: employeesData, isLoading: employeesLoading } = useCompanyEmployees();

  const queryClient = useQueryClient();

  useEffect(() => {
    prefetchAppealCategories(queryClient);
  }, [queryClient]);



  if (userLoading) {
    return <Loading size="large" text="Загрузка данных пользователя..." className="min-h-screen" />;
  }

  if (error) {
    return <div>Ошибка загрузки данных пользователя</div>;
  }

  return (
    <div>
      {user?.user_type === 'legal' ? (
        <LegalAccount
          user={user}
          companyData={companyData}
          employeesData={employeesData}
          isLoadingCompany={companyLoading}
          isLoadingEmployees={employeesLoading}
        />
      ) : (
        <PhysicalAccount user={user} isLoading={userLoading} />
      )}
    </div>
  );
};