import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { validationRules } from '../../../../shared/utils/validators';
import { normalizePhoneForServer } from '../../../../shared/utils/formatters';
import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { Loading } from '../../../../shared/ui/Loading';
import { useAuth } from '../../hooks/useAuth';
import { registerEmployeeApi } from '../../../../shared/api/auth/registerApi';

export const EmployeeRegister = ({ prefill }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const { registerMutation, isRegisterPending, registerError } = useAuth();

  useEffect(() => {
    if (prefill?.inviteToken) {
      setValue('company_token', prefill.inviteToken);
    }

    if (prefill?.email) {
      setValue('email', prefill.email);
    }
  }, [prefill, setValue]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      phone: normalizePhoneForServer(data.phone),
    };

    registerMutation.mutate({
      registerFn: registerEmployeeApi,
      payload: payload
    });
  };

  if (isRegisterPending) return <Loading />;

  if (registerMutation.isSuccess) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <FormField label="Токен компании" error={errors.company_token} required>
        <TextInput
          {...register('company_token', validationRules.companyToken)}
          placeholder="Введите 32-символьный токен от руководителя"
          error={errors.company_token}
        />
      </FormField>

      <FormField label="Имя" error={errors.first_name} required>
        <TextInput
          {...register('first_name', validationRules.required('Имя'))}
          error={errors.first_name}
        />
      </FormField>

      <FormField label="Фамилия" error={errors.last_name} required>
        <TextInput
          {...register('last_name', validationRules.required('Фамилия'))}
          error={errors.last_name}
        />
      </FormField>

      <FormField label="Отчество" error={errors.second_name}>
        <TextInput
          {...register('second_name')}
          error={errors.second_name}
        />
      </FormField>

      <FormField label="Должность в компании" error={errors.position} required>
        <TextInput
          {...register('position', validationRules.required('Должность'))}
          placeholder="Например: Менеджер по продажам"
          error={errors.position}
        />
      </FormField>

      <FormField label="Номер телефона" error={errors.phone} required>
        <PhoneInput
          {...register('phone', validationRules.phone)}
          value={phoneValue || '+7 '}
          setValue={setValue}
          error={errors.phone}
        />
      </FormField>

      <FormField label="Email" error={errors.email} required>
        <TextInput
          {...register('email', validationRules.email)}
          type="email"
          error={errors.email}
        />
      </FormField>

      <FormField label="Пароль" error={errors.password} required>
        <TextInput
          {...register('password', validationRules.password())}
          type="password"
          error={errors.password}
        />
      </FormField>
      {registerMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm text-center">
            {registerError}
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={isRegisterPending}
        className="w-full max-w-xs mx-auto flex justify-center py-2 px-4 md:py-3 md:px-6 border border-transparent rounded-3xl text-sm md:text-base font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isRegisterPending ? 'Регистрация...' : 'Присоединиться к компании'}
      </button>
    </form>
  );
};
