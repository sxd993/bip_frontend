import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useCompanyData, useCompanyEmployees } from '../../hooks/useCompanyData';
import { LegalAccount } from './Legal/LegalAccount';
import { PhysicalAccount } from './Physical/PhysicalAccount';
import { Loading } from '../../components/Loading';

const Account = () => {
  const { data: user, error, isLoading } = useCurrentUser();
  const { data: companyData, isLoading: companyLoading } = useCompanyData();
  const { data: employeesData, isLoading: employeesLoading } = useCompanyEmployees();

  if (isLoading) {
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
        <PhysicalAccount user={user} />
      )}
    </div>
  );
};

export default Account;