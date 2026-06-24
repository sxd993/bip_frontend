import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Loading } from '@/shared/ui/Loading';
import { validationRules, PHONE_PLACEHOLDER } from '@/shared/utils/validators';
import { useEmployeeRegisterForm } from '../hooks/useEmployeeRegisterForm';
import { PersonalDataConsentField } from './PersonalDataConsentField';

export const RegisterEmployeeForm = ({ inviteToken, inviteEmail }) => {
  const {
    register,
    errors,
    password,
    onSubmitForm,
    isFormValid,
    isPending,
    isSuccess,
    isError,
    errorMessage,
  } = useEmployeeRegisterForm({ inviteToken, inviteEmail });

  if (isPending) {
    return <Loading fullScreen />;
  }

  if (isSuccess) {
    return (
      <div className="py-4 text-center">
        <p className="font-semibold text-text">Регистрация успешна!</p>
        <p className="mt-1 text-sm text-text-muted">
          Перенаправляем в личный кабинет...
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitForm} noValidate>
      <p className="text-sm leading-relaxed text-text-muted">
        Заполните данные для входа в личный кабинет компании.
      </p>

      <Field error={errors.last_name?.message}>
        <Input
          {...register('last_name', validationRules.personName('Фамилия'))}
          placeholder="Фамилия"
          hasError={Boolean(errors.last_name)}
        />
      </Field>

      <Field error={errors.first_name?.message}>
        <Input
          {...register('first_name', validationRules.personName('Имя'))}
          placeholder="Имя"
          hasError={Boolean(errors.first_name)}
        />
      </Field>

      <Field error={errors.second_name?.message}>
        <Input
          {...register('second_name', validationRules.personName('Отчество'))}
          placeholder="Отчество"
          hasError={Boolean(errors.second_name)}
        />
      </Field>

      <Field error={errors.email?.message}>
        <Input
          {...register('email', validationRules.email)}
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          readOnly={Boolean(inviteEmail)}
          hasError={Boolean(errors.email)}
        />
      </Field>

      <Field error={errors.phone?.message}>
        <Input
          {...register('phone', validationRules.phone)}
          type="tel"
          inputMode="tel"
          placeholder={PHONE_PLACEHOLDER}
          autoComplete="tel"
          hasError={Boolean(errors.phone)}
        />
      </Field>

      <Field error={errors.password?.message}>
        <Input
          {...register('password', validationRules.password())}
          type="password"
          placeholder="Пароль"
          autoComplete="new-password"
          hasError={Boolean(errors.password)}
        />
      </Field>

      <Field error={errors.confirmPassword?.message}>
        <Input
          {...register(
            'confirmPassword',
            validationRules.confirmPassword(password),
          )}
          type="password"
          placeholder="Подтверждение пароля"
          autoComplete="new-password"
          hasError={Boolean(errors.confirmPassword)}
        />
      </Field>

      <PersonalDataConsentField
        register={register}
        error={errors.personalDataConsent?.message}
      />

      {isError && errorMessage && (
        <p className="text-center text-sm text-error">{errorMessage}</p>
      )}

      <Button type="submit" disabled={!isFormValid || isPending}>
        Создать аккаунт
      </Button>
    </form>
  );
};
