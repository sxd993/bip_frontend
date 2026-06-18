import { useRegisterTabs } from '../hooks/useRegisterTabs';
import { RegisterLegalForm } from './RegisterLegalForm';
import { RegisterPhysicalForm } from './RegisterPhysicalForm';

const UserTypeRadio = ({ value, label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
    <input
      type="radio"
      name="registerUserType"
      value={value}
      checked={checked}
      onChange={() => onChange()}
      className="accent-primary"
    />
    {label}
  </label>
);

export const RegisterForm = ({ defaultUserType = 'physical' }) => {
  const { userType, selectPhysical, selectLegal } = useRegisterTabs({ defaultUserType });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-6">
        <UserTypeRadio
          value="physical"
          label="Частное лицо"
          checked={userType === 'physical'}
          onChange={selectPhysical}
        />
        <UserTypeRadio
          value="legal"
          label="Юридическое лицо"
          checked={userType === 'legal'}
          onChange={selectLegal}
        />
      </div>

      {userType === 'physical' && <RegisterPhysicalForm />}
      {userType === 'legal' && <RegisterLegalForm />}
    </div>
  );
};
