import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import { useLoginForm } from '../hooks/useLoginForm';

const UserTypeRadio = ({ value, label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-text">
    <input
      type="radio"
      name="userType"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="accent-primary"
    />
    {label}
  </label>
);

export const LoginForm = () => {
  const {
    emailOrPhone,
    password,
    userType,
    setEmailOrPhone,
    setPassword,
    setUserType,
    handleSubmit,
    isPending,
    isError,
    errorMessage,
  } = useLoginForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="flex justify-center gap-6">
        <UserTypeRadio
          value="physical"
          label="Частное лицо"
          checked={userType === 'physical'}
          onChange={setUserType}
        />
        <UserTypeRadio
          value="legal"
          label="Юридическое лицо"
          checked={userType === 'legal'}
          onChange={setUserType}
        />
      </div>

      <Field>
        <Input
          type="text"
          placeholder="Логин"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          autoComplete="username"
          required
        />
      </Field>

      <Field>
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </Field>

      {isError && (
        <p className="text-center text-xs text-error">
          {errorMessage || 'Ошибка при входе'}
        </p>
      )}

      <SubmitButton className="mt-2" disabled={isPending}>
        {isPending ? 'Вход...' : 'Войти'}
      </SubmitButton>
    </form>
  );
};
