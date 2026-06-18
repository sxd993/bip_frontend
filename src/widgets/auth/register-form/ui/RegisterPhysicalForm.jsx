import { PhoneInput } from '@/shared/components/forms';
import { Field } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { SubmitButton } from '@/shared/ui/SubmitButton';
import { Loading } from '@/shared/ui/Loading';
import { validationRules } from '@/shared/utils/validators';
import { usePhysicalRegisterForm } from '../hooks/usePhysicalRegisterForm';

const inputClassName =
  'w-full rounded-lg border bg-surface px-4 py-3 text-base text-text outline-none transition placeholder:text-text-muted focus:border-primary';

export const RegisterPhysicalForm = () => {
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
  } = usePhysicalRegisterForm();

  if (isPending) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <div className="py-4 text-center">
        <p className="font-semibold text-text">Регистрация успешна!</p>
        <p className="mt-1 text-sm text-text-muted">Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmitForm} noValidate>
      <Field error={errors.last_name?.message}>
        <Input
          {...register('last_name', validationRules.required('Фамилия'))}
          placeholder="Фамилия"
          hasError={Boolean(errors.last_name)}
        />
      </Field>

      <Field error={errors.first_name?.message}>
        <Input
          {...register('first_name', validationRules.required('Имя'))}
          placeholder="Имя"
          hasError={Boolean(errors.first_name)}
        />
      </Field>

      <Field error={errors.second_name?.message}>
        <Input
          {...register('second_name', validationRules.required('Отчество'))}
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
