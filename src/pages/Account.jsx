import { useUser } from '../shared/hooks/useUser';
import { useCompanyData, useCompanyEmployees } from '../shared/hooks/useCompanyData';
import { LegalAccount } from '../features/legal_account/components/LegalAccount';
import { PhysicalAccount } from '../features/physical_account/PhysicalAccount';
import { Loading } from '../shared/ui/Loading';

export const Account = () => {
  const { user, isLoading: userLoading, error } = useUser();
  const { data: companyData, isLoading: companyLoading } = useCompanyData();
  const { data: employeesData, isLoading: employeesLoading } = useCompanyEmployees();
  console.log(user)
  if (userLoading) {
    return <Loading />;
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
