import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCompanyData, useCompanyEmployees } from '../entities/business/company/model/useCompanyData';
import { prefetchAppealCategories } from '../features/create-appeal/utils/prefetch';
import { LegalAccount } from '../features/view-account/legal/components/LegalAccount';
import { PhysicalAccount } from '../features/view-account/physical/components/PhysicalAccount';
import { useUser } from '@/entities/business/user/model/useUser';

export const Account = () => {
  const { user, isLoading: userLoading, error } = useUser();
  const { data: companyData, isLoading: companyLoading } = useCompanyData();
  const { data: employeesData, isLoading: employeesLoading } = useCompanyEmployees();

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