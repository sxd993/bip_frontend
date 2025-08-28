import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerLegalEntityApi } from '../../api/registerApi';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../shared/ui/Loading';
import { normalizePhoneForServer, handlePhoneInput, validatePhone, handlePhoneKeyDown } from '../../utils/phoneUtils';

export const LegalRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const mutation = useMutation({
    mutationFn: registerLegalEntityApi,
    onSuccess: (data) => {
      setMessage('Регистрация юридического лица успешна!');
      setError('');
      queryClient.setQueryData(['user'], data);
      setTimeout(() => navigate('/personal-account'), 2000);
    },
    onError: (error) => {
      setError(error?.message || 'Ошибка регистрации');
      setMessage('');
    },
  });

  const onSubmit = (data) => {
    setMessage('');
    setError('');

    const formData = {
      ...data,
      phone: normalizePhoneForServer(data.phone),
    };

    mutation.mutate(formData);
  };

  if (mutation.isPending) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Название организации</label>
        <input
          type="text"
          {...register('company_name', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.company_name && <span className="text-red-600 text-sm">{errors.company_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ИНН</label>
        <input
          type="text"
          {...register('inn', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.inn && <span className="text-red-600 text-sm">{errors.inn.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Имя руководителя</label>
        <input
          type="text"
          {...register('employee_first_name', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.employee_first_name && <span className="text-red-600 text-sm">{errors.employee_first_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия руководителя</label>
        <input
          type="text"
          {...register('employee_second_name', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.employee_second_name && <span className="text-red-600 text-sm">{errors.employee_second_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Отчество руководителя</label>
        <input
          type="text"
          {...register('employee_last_name', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.employee_last_name && <span className="text-red-600 text-sm">{errors.employee_last_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Номер телефона</label>
        <input
          type="tel"
          value={phoneValue || '+7 '}
          {...register('phone', {
            required: 'Обязательное поле',
            validate: validatePhone,
          })}
          onChange={(e) => handlePhoneInput(e, setValue)}
          onKeyDown={handlePhoneKeyDown}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.phone && <span className="text-red-600 text-sm">{errors.phone.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
        <input
          type="password"
          {...register('password', { required: 'Обязательное поле' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={mutation.isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {mutation.isPending ? 'Регистрация...' : 'Зарегистрировать организацию'}
      </button>

      {message && <div className="text-green-600 text-sm text-center">{message}</div>}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </form>
  );
};