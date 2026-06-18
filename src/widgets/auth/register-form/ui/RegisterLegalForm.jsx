import { PhoneInput } from '@/shared/components/forms';
import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import { Loading } from '@/shared/ui/Loading';
import { validationRules } from '@/shared/utils/validators';
import { useLegalRegisterForm } from '../hooks/useLegalRegisterForm';

const inputClassName =
  'w-full rounded-lg border bg-surface px-4 py-3 text-base text-text outline-none transition placeholder:text-text-muted focus:border-primary';

export const RegisterLegalForm = () => {
  const {
    register,
    setValue,
    errors,
    phoneValue,
    password,
    onSubmitForm,
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
          {...register('company_name', validationRules.required('Название организации'))}
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
          {...register('employee_second_name', validationRules.required('Фамилия руководителя'))}
          placeholder="Фамилия руководителя"
          hasError={Boolean(errors.employee_second_name)}
        />
      </Field>

      <Field error={errors.employee_first_name?.message}>
        <Input
          {...register('employee_first_name', validationRules.required('Имя руководителя'))}
          placeholder="Имя руководителя"
          hasError={Boolean(errors.employee_first_name)}
        />
      </Field>

      <Field error={errors.employee_last_name?.message}>
        <Input
          {...register('employee_last_name', validationRules.required('Отчество руководителя'))}
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
        <PhoneInput
          {...register('phone', validationRules.phone)}
          value={phoneValue || '+7 '}
          setValue={setValue}
          error={errors.phone}
          placeholder="Номер телефона"
          className={`${inputClassName} ${errors.phone ? 'border-error' : 'border-border'}`}
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
        <p className="text-center text-xs text-error">{errorMessage}</p>
      )}

      <SubmitButton className="mt-2">Создать аккаунт</SubmitButton>
    </form>
  );
};
