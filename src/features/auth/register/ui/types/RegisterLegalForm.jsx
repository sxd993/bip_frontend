import { useForm } from 'react-hook-form';
import { FormField, TextInput, PhoneInput } from '../../../../../shared/components/forms';
import { validationRules } from '../../../../../shared/utils/validators';
import { Loading } from '../../../../../shared/ui/Loading';
import { useLegalRegister } from '../../model/hooks/useLegalRegister';

export const RegisterLegalForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const phoneValue = watch('phone');

  const { onSubmit, isPending, isSuccess, isError, errorMessage } = useLegalRegister();

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <FormField label="Название организации" error={errors.company_name} required>
        <TextInput
          {...register('company_name', validationRules.required('Название организации'))}
          error={errors.company_name}
        />
      </FormField>

      <FormField label="ИНН" error={errors.inn} required>
        <TextInput {...register('inn', validationRules.inn)} error={errors.inn} />
      </FormField>

      <FormField label="Имя руководителя" error={errors.employee_first_name} required>
        <TextInput
          {...register('employee_first_name', validationRules.required('Имя руководителя'))}
          error={errors.employee_first_name}
        />
      </FormField>

      <FormField label="Фамилия руководителя" error={errors.employee_second_name} required>
        <TextInput
          {...register('employee_second_name', validationRules.required('Фамилия руководителя'))}
          error={errors.employee_second_name}
        />
      </FormField>

      <FormField label="Отчество руководителя" error={errors.employee_last_name} required>
        <TextInput
          {...register('employee_last_name', validationRules.required('Отчество руководителя'))}
          error={errors.employee_last_name}
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

      {isError && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full max-w-xs mx-auto flex justify-center py-2 px-4 md:py-3 md:px-6 border border-transparent rounded-3xl text-sm md:text-base font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isPending ? 'Регистрация...' : 'Зарегистрировать организацию'}
      </button>
    </form>
  );
};
