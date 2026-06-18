import { UserTypeSwitch } from '@/shared/ui/UserTypeSwitch';
import { useRegisterTabs } from '../hooks/useRegisterTabs';
import { RegisterLegalForm } from './RegisterLegalForm';
import { RegisterPhysicalForm } from './RegisterPhysicalForm';

export const RegisterForm = ({ defaultUserType = 'physical' }) => {
  const { userType, selectPhysical, selectLegal } = useRegisterTabs({ defaultUserType });

  const handleUserTypeChange = (type) => {
    if (type === 'legal') {
      selectLegal();
    } else {
      selectPhysical();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <UserTypeSwitch value={userType} onChange={handleUserTypeChange} />

      {userType === 'physical' && <RegisterPhysicalForm />}
      {userType === 'legal' && <RegisterLegalForm />}
    </div>
  );
};
