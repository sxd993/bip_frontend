import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerEmployeeApi } from '../../api/registerApi';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../shared/ui/Loading';
import { normalizePhoneForServer, handlePhoneInput, validatePhone, handlePhoneKeyDown } from '../../utils/phoneUtils';

export const EmployeeRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const mutation = useMutation({
    mutationFn: registerEmployeeApi,
    onSuccess: (data) => {
      setMessage(`Регистрация успешна! Вы присоединились к компании ${data.company_name}`);
      setError('');
      queryClient.setQueryData(['user'], data);
      setTimeout(() => navigate('/personal-account'), 2000);
    },
    onError: (error) => {
      setError(error.response?.data?.detail || 'Ошибка регистрации. Проверьте токен компании');
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Токен компании</label>
        <input
          type="text"
          {...register('company_token', { 
            required: 'Обязательное поле',
            minLength: { value: 32, message: 'Токен должен содержать 32 символа' },
            maxLength: { value: 32, message: 'Токен должен содержать 32 символа' }
          })}
          placeholder="Введите 32-символьный токен от руководителя"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.company_token && <span className="text-red-600 text-sm mt-2 block">{errors.company_token.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Имя</label>
        <input
          type="text"
          {...register('first_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.first_name && <span className="text-red-600 text-sm mt-2 block">{errors.first_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Фамилия</label>
        <input
          type="text"
          {...register('last_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.last_name && <span className="text-red-600 text-sm mt-2 block">{errors.last_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Отчество</label>
        <input
          type="text"
          {...register('second_name')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Должность в компании</label>
        <input
          type="text"
          {...register('position', { required: 'Укажите вашу должность' })}
          placeholder="Например: Менеджер по продажам"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.position && <span className="text-red-600 text-sm mt-2 block">{errors.position.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Номер телефона</label>
        <input
          type="tel"
          value={phoneValue || '+7 '}
          {...register('phone', {
            required: 'Обязательное поле',
            validate: validatePhone,
          })}
          onChange={(e) => handlePhoneInput(e, setValue)}
          onKeyDown={handlePhoneKeyDown}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.phone && <span className="text-red-600 text-sm mt-2 block">{errors.phone.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
        <input
          type="email"
          {...register('email', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.email && <span className="text-red-600 text-sm mt-2 block">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Пароль</label>
        <input
          type="password"
          {...register('password', { 
            required: 'Обязательное поле',
            minLength: { value: 6, message: 'Минимум 6 символов' }
          })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.password && <span className="text-red-600 text-sm mt-2 block">{errors.password.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={mutation.isPending}
        className="w-full flex justify-center py-4 px-8 border border-transparent rounded-xl shadow-sm text-lg font-semibold text-white bg-red-400 hover:bg-red-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {mutation.isPending ? 'Регистрация...' : 'Присоединиться к компании'}
      </button>

      {message && <div className="text-green-600 text-sm text-center">{message}</div>}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </form>
  );
};