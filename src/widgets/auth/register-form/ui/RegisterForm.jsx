import { UserTypeSwitch } from '@/shared/ui/UserTypeSwitch';
import { useRegisterTabs } from '../hooks/useRegisterTabs';
import { RegisterLegalForm } from './RegisterLegalForm';
import { RegisterPhysicalForm } from './RegisterPhysicalForm';
import { RegisterEmployeeForm } from './RegisterEmployeeForm';

export const RegisterForm = ({
  defaultUserType = 'physical',
  legalType,
  inviteToken,
  inviteEmail,
}) => {
  const isEmployeeInvite = legalType === 'employee' && Boolean(inviteToken);

  const { userType, selectPhysical, selectLegal } = useRegisterTabs({
    defaultUserType: isEmployeeInvite ? 'legal' : defaultUserType,
  });

  const handleUserTypeChange = (type) => {
    if (type === 'legal') {
      selectLegal();
    } else {
      selectPhysical();
    }
  };

  if (isEmployeeInvite) {
    return (
      <RegisterEmployeeForm
        inviteToken={inviteToken}
        inviteEmail={inviteEmail}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UserTypeSwitch value={userType} onChange={handleUserTypeChange} />

      {userType === 'physical' && <RegisterPhysicalForm />}
      {userType === 'legal' && <RegisterLegalForm />}
    </div>
  );
};
