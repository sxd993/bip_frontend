import { useForm } from 'react-hook-form';
import { validationRules } from '../../../../shared/utils/validators';
import { normalizePhoneForServer } from '../../../../shared/utils/formatters';
import { FormField, TextInput, PhoneInput } from '../../../../shared/components/forms';
import { Loading } from '../../../../shared/ui/Loading';
import { useAuth } from '../../hooks/useAuth';

export const PhysicalRegister = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const { registerMutation, loginMutation } = useAuth();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      phone: normalizePhoneForServer(data.phone),
    };
    registerMutation.mutate(payload);
  };

  if (registerMutation.isLoading || loginMutation.isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Ошибки */}
      {(registerMutation.isError || loginMutation.isError) && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm text-center">
            {registerMutation.isError && 'Ошибка регистрации'}
            {loginMutation.isError && 'Ошибка авторизации'}
          </p>
        </div>
      )}

      {/* Номер телефона */}
      <FormField label="Номер телефона" error={errors.phone} required>
        <PhoneInput
          {...register('phone', validationRules.phone)}
          value={phoneValue || '+7 '}
          setValue={setValue}
          error={errors.phone}
        />
      </FormField>

      {/* Пароль */}
      <FormField label="Пароль" error={errors.password} required>
        <TextInput
          {...register('password', validationRules.password())}
          type="password"
          error={errors.password}
        />
      </FormField>

      {/* Имя */}
      <FormField label="Имя" error={errors.first_name} required>
        <TextInput
          {...register('first_name', validationRules.required('Имя'))}
          error={errors.first_name}
        />
      </FormField>

      {/* Фамилия */}
      <FormField label="Фамилия" error={errors.last_name} required>
        <TextInput
          {...register('last_name', validationRules.required('Фамилия'))}
          error={errors.last_name}
        />
      </FormField>

      {/* Отчество */}
      <FormField label="Отчество" error={errors.second_name}>
        <TextInput
          {...register('second_name')}
          error={errors.second_name}
        />
      </FormField>

      {/* Email */}
      <FormField label="Email" error={errors.email} required>
        <TextInput
          {...register('email', validationRules.email)}
          type="email"
          error={errors.email}
        />
      </FormField>

      {/* Дата рождения */}
      <FormField label="Дата рождения" error={errors.birthdate} required>
        <TextInput
          {...register('birthdate', validationRules.required('Дата рождения'))}
          type="date"
          error={errors.birthdate}
        />
      </FormField>

      <button
        type="submit"
        disabled={registerMutation.isLoading || loginMutation.isLoading}
        className="w-full max-w-xs mx-auto flex justify-center py-2 px-4 md:py-3 md:px-6 border border-transparent rounded-3xl text-sm md:text-base font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {(registerMutation.isLoading || loginMutation.isLoading) ? 'Обработка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};
