import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerEmployeeApi } from '../../api/registerApi';
import { useApiMutation } from '../../../../shared/hooks/useApiMutation';
import { validationRules } from '../../../../shared/utils/validators';
import { normalizePhoneForServer } from '../../utils/phoneUtils';
import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { Loading } from '../../../../shared/ui/Loading';

export const EmployeeRegister = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const registerMutation = useApiMutation(registerEmployeeApi, {
    successMessage: 'Регистрация успешна!',
    errorMessage: 'Ошибка регистрации. Проверьте токен компании',
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Регистрация успешна!</h3>
        <p className="text-gray-600">Вы присоединились к компании. Перенаправляем в личный кабинет...</p>
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

      {/* Токен компании */}
      <FormField 
        label="Токен компании" 
        error={errors.company_token}
        required
      >
        <TextInput
          {...register('company_token', validationRules.companyToken)}
          placeholder="Введите 32-символьный токен от руководителя"
          error={errors.company_token}
        />
      </FormField>

      {/* Имя */}
      <FormField 
        label="Имя" 
        error={errors.first_name}
        required
      >
        <TextInput
          {...register('first_name', validationRules.required('Имя'))}
          error={errors.first_name}
        />
      </FormField>

      {/* Фамилия */}
      <FormField 
        label="Фамилия" 
        error={errors.last_name}
        required
      >
        <TextInput
          {...register('last_name', validationRules.required('Фамилия'))}
          error={errors.last_name}
        />
      </FormField>

      {/* Отчество */}
      <FormField 
        label="Отчество" 
        error={errors.second_name}
      >
        <TextInput
          {...register('second_name')}
          error={errors.second_name}
        />
      </FormField>

      {/* Должность */}
      <FormField 
        label="Должность в компании" 
        error={errors.position}
        required
      >
        <TextInput
          {...register('position', validationRules.required('Должность'))}
          placeholder="Например: Менеджер по продажам"
          error={errors.position}
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
        className="w-full flex justify-center py-4 px-8 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white bg-red-400 hover:bg-red-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {registerMutation.isLoading ? 'Регистрация...' : 'Присоединиться к компании'}
      </button>
    </form>
  );
};