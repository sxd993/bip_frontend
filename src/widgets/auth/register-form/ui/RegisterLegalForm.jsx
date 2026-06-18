import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import { Loading } from '@/shared/ui/Loading';
import { validationRules, PHONE_PLACEHOLDER } from '@/shared/utils/validators';
import { useLegalRegisterForm } from '../hooks/useLegalRegisterForm';

export const RegisterLegalForm = () => {
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
  } = useLegalRegisterForm();

  if (isPending) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <div className="py-4 text-center">
        <p className="font-semibold text-text">Регистрация организации успешна!</p>
        <p className="mt-1 text-sm text-text-muted">Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitForm} noValidate>
      <Field error={errors.company_name?.message}>
        <Input
          {...register('company_name', validationRules.companyName)}
          placeholder="Название организации"
          hasError={Boolean(errors.company_name)}
        />
      </Field>

      <Field error={errors.inn?.message}>
        <Input
          {...register('inn', validationRules.inn)}
          placeholder="ИНН"
          hasError={Boolean(errors.inn)}
        />
      </Field>

      <Field error={errors.employee_second_name?.message}>
        <Input
          {...register('employee_second_name', validationRules.personName('Фамилия руководителя'))}
          placeholder="Фамилия руководителя"
          hasError={Boolean(errors.employee_second_name)}
        />
      </Field>

      <Field error={errors.employee_first_name?.message}>
        <Input
          {...register('employee_first_name', validationRules.personName('Имя руководителя'))}
          placeholder="Имя руководителя"
          hasError={Boolean(errors.employee_first_name)}
        />
      </Field>

      <Field error={errors.employee_last_name?.message}>
        <Input
          {...register('employee_last_name', validationRules.personName('Отчество руководителя'))}
          placeholder="Отчество руководителя"
          hasError={Boolean(errors.employee_last_name)}
        />
      </Field>

      <Field error={errors.email?.message}>
        <Input
          {...register('email', validationRules.email)}
          type="email"
          placeholder="E-mail"
          autoComplete="email"
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
          {...register('confirmPassword', validationRules.confirmPassword(password))}
          type="password"
          placeholder="Подтверждение пароля"
          autoComplete="new-password"
          hasError={Boolean(errors.confirmPassword)}
        />
      </Field>

      {isError && errorMessage && (
        <p className="text-center text-sm text-error">{errorMessage}</p>
      )}

      <SubmitButton disabled={!isFormValid || isPending}>Создать аккаунт</SubmitButton>
    </form>
  );
};
