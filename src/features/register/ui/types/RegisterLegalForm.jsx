import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { Loading } from '../../../../shared/ui/Loading';
import { validationRules } from '../../../../shared/utils/validators';
import { useLegalRegisterForm } from '../../model/hooks/useLegalRegisterForm';

export const RegisterLegalForm = () => {
  const {
    formId,
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
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Регистрация организации успешна!</h3>
        <p className="text-gray-600">Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmitForm}
      className="space-y-8"
    >
      <FormField
        label="Название организации"
        error={errors.company_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('company_name', validationRules.required('Название организации'))}
          error={errors.company_name}
          placeholder="Название организации"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="ИНН организации"
        error={errors.inn}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('inn', validationRules.inn)}
          error={errors.inn}
          placeholder="ИНН организации"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Фамилия руководителя"
        error={errors.employee_second_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('employee_second_name', validationRules.required('Фамилия руководителя'))}
          error={errors.employee_second_name}
          placeholder="Фамилия руководителя"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Имя руководителя"
        error={errors.employee_first_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('employee_first_name', validationRules.required('Имя руководителя'))}
          error={errors.employee_first_name}
          placeholder="Имя руководителя"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Отчество руководителя"
        error={errors.employee_last_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('employee_last_name', validationRules.required('Отчество руководителя'))}
          error={errors.employee_last_name}
          placeholder="Отчество руководителя"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Email"
        error={errors.email}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('email', validationRules.email)}
          type="email"
          error={errors.email}
          placeholder="Email"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Номер телефона"
        error={errors.phone}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <PhoneInput
          {...register('phone', validationRules.phone)}
          value={phoneValue || '+7 '}
          setValue={setValue}
          error={errors.phone}
          placeholder="Номер телефона"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Пароль"
        error={errors.password}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('password', validationRules.password())}
          type="password"
          error={errors.password}
          placeholder="Пароль"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label="Подтверждение пароля"
        error={errors.confirmPassword}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('confirmPassword', validationRules.confirmPassword(password))}
          type="password"
          error={errors.confirmPassword}
          placeholder="Подтверждение пароля"
          className="placeholder-register"
        />
      </FormField>

      {isError && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 text-white/80">
        <span className="mt-[-4px] text-3xl sm:text-4xl leading-none font-bold">!</span>
        <p className="text-xs sm:text-sm lg:text-base leading-snug italic">
          Регистрация сотрудника доступна только по персональной ссылке из письма-приглашения.
          Попросите руководителя отправить новое приглашение.
        </p>
      </div>

      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
};