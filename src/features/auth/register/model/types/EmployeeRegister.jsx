import { FormField, TextInput, PhoneInput } from '../../../../../shared/components/forms';
import { Loading } from '../../../../../shared/ui/Loading';
import { validationRules } from '../../../../../shared/utils/validators';
import { useEmployeeRegisterForm } from '../hooks/emloyee/useEmployeeRegisterForm';

export const EmployeeRegister = ({ prefill }) => {
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
    hasInviteToken,
  } = useEmployeeRegisterForm(prefill);

  if (isPending) return <Loading />;

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Регистрация успешна!</h3>
        <p className="text-gray-600">Вы присоединились к компании. Перенаправляем в личный кабинет...</p>
      </div>
    );
  }

  if (!hasInviteToken) {
    return (
      <div className="text-center py-8 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Регистрация по приглашению</h3>
        <p className="text-gray-600">
          Регистрация сотрудника доступна только по персональной ссылке из письма-приглашения.
          Попросите руководителя отправить новое приглашение.
        </p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmitForm}
      className="space-y-8"
    >
      <input type="hidden" {...register('company_token', { required: true })} />

      <FormField
        label=" "
        error={errors.first_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('first_name', validationRules.required('Имя'))}
          error={errors.first_name}
          placeholder="Имя"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label=" "
        error={errors.last_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('last_name', validationRules.required('Фамилия'))}
          error={errors.last_name}
          placeholder="Фамилия"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label=" "
        error={errors.second_name}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('second_name', validationRules.required('Отчество'))}
          error={errors.second_name}
          placeholder="Отчество"
          className="placeholder-register"
        />
      </FormField>

      <FormField
        label=" "
        error={errors.position}
        required
        labelClassName="text-white"
        requiredClassName="text-white"
      >
        <TextInput
          {...register('position', validationRules.required('Должность'))}
          placeholder="Должность в компании"
          className="placeholder-register"
          error={errors.position}
        />
      </FormField>

      <FormField
        label=" "
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
        label=" "
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
        label=" "
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
        label=" "
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
          <p className="text-red-600 text-sm text-center">
            {errorMessage}
          </p>
        </div>
      )}

      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
};
