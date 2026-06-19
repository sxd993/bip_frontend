import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { UserTypeSwitch } from '@/shared/ui/UserTypeSwitch';
import { validationRules } from '@/shared/utils/validators';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
  const {
    register,
    errors,
    userType,
    setUserType,
    handleSubmit,
    isFormValid,
    isPending,
    isError,
    errorMessage,
  } = useLoginForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <UserTypeSwitch value={userType} onChange={setUserType} />

      <Field error={errors.email_or_phone?.message}>
        <Input
          type="text"
          placeholder="Логин"
          autoComplete="username"
          hasError={Boolean(errors.email_or_phone)}
          {...register('email_or_phone', validationRules.loginIdentifier)}
        />
      </Field>

      <Field error={errors.password?.message}>
        <Input
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          hasError={Boolean(errors.password)}
          {...register('password', validationRules.loginPassword)}
        />
      </Field>

      {isError && (
        <p className="text-center text-sm text-error">
          {errorMessage || 'Ошибка при входе'}
        </p>
      )}

      <Button type="submit" disabled={!isFormValid || isPending}>
        {isPending ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};
