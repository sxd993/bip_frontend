import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerLegalEntityApi } from '../../api/registerApi';
import { useApiMutation } from '../../../../shared/hooks/useApiMutation';
import { validationRules } from '../../../../shared/utils/validators';
import { normalizePhoneForServer } from '../../utils/phoneUtils';
import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { Loading } from '../../../../shared/ui/Loading';

export const LegalRegister = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const registerMutation = useApiMutation(registerLegalEntityApi, {
    successMessage: 'Регистрация юридического лица успешна!',
    errorMessage: 'Ошибка регистрации',
    onSuccess: (data) => {
      setTimeout(() => navigate('/personal-account'), 2000);
    }
  });

  const onSubmit = (data) => {
    const formData = {
      ...data,
      phone: normalizePhoneForServer(data.phone),
    };

    registerMutation.executeAsync(formData);
  };

  if (registerMutation.isLoading) return <Loading />;

  // Показываем success экран
  if (registerMutation.isSuccess) {
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
      {/* Отображение ошибок */}
      {registerMutation.isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm text-center">{registerMutation.errorMessage}</p>
        </div>
      )}

      {/* Название организации */}
      <FormField 
        label="Название организации" 
        error={errors.company_name}
        required
      >
        <TextInput
          {...register('company_name', validationRules.required('Название организации'))}
          error={errors.company_name}
        />
      </FormField>

      {/* ИНН */}
      <FormField 
        label="ИНН" 
        error={errors.inn}
        required
      >
        <TextInput
          {...register('inn', validationRules.inn)}
          error={errors.inn}
        />
      </FormField>

      {/* Имя руководителя */}
      <FormField 
        label="Имя руководителя" 
        error={errors.employee_first_name}
        required
      >
        <TextInput
          {...register('employee_first_name', validationRules.required('Имя руководителя'))}
          error={errors.employee_first_name}
        />
      </FormField>

      {/* Фамилия руководителя */}
      <FormField 
        label="Фамилия руководителя" 
        error={errors.employee_second_name}
        required
      >
        <TextInput
          {...register('employee_second_name', validationRules.required('Фамилия руководителя'))}
          error={errors.employee_second_name}
        />
      </FormField>

      {/* Отчество руководителя */}
      <FormField 
        label="Отчество руководителя" 
        error={errors.employee_last_name}
        required
      >
        <TextInput
          {...register('employee_last_name', validationRules.required('Отчество руководителя'))}
          error={errors.employee_last_name}
        />
      </FormField>

      {/* Номер телефона */}
      <FormField 
        label="Номер телефона" 
        error={errors.phone}
        required
      >
        <PhoneInput
          {...register('phone', validationRules.phone)}
          value={phoneValue || '+7 '}
          setValue={setValue}
          error={errors.phone}
        />
      </FormField>

      {/* Email */}
      <FormField 
        label="Email" 
        error={errors.email}
        required
      >
        <TextInput
          {...register('email', validationRules.email)}
          type="email"
          error={errors.email}
        />
      </FormField>

      {/* Пароль */}
      <FormField 
        label="Пароль" 
        error={errors.password}
        required
      >
        <TextInput
          {...register('password', validationRules.password())}
          type="password"
          error={errors.password}
        />
      </FormField>

      <button 
        type="submit" 
        disabled={registerMutation.isLoading}
        className="w-full flex justify-center py-4 px-8 border border-transparent rounded-3xl text-lg font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {registerMutation.isLoading ? 'Регистрация...' : 'Зарегистрировать организацию'}
      </button>
    </form>
  );
};