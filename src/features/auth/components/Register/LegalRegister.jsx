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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Название организации</label>
        <input
          type="text"
          {...register('company_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.company_name && <span className="text-red-600 text-sm mt-2 block">{errors.company_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">ИНН</label>
        <input
          type="text"
          {...register('inn', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.inn && <span className="text-red-600 text-sm mt-2 block">{errors.inn.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Имя руководителя</label>
        <input
          type="text"
          {...register('employee_first_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.employee_first_name && <span className="text-red-600 text-sm mt-2 block">{errors.employee_first_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Фамилия руководителя</label>
        <input
          type="text"
          {...register('employee_second_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.employee_second_name && <span className="text-red-600 text-sm mt-2 block">{errors.employee_second_name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Отчество руководителя</label>
        <input
          type="text"
          {...register('employee_last_name', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.employee_last_name && <span className="text-red-600 text-sm mt-2 block">{errors.employee_last_name.message}</span>}
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
          {...register('password', { required: 'Обязательное поле' })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
        />
        {errors.password && <span className="text-red-600 text-sm mt-2 block">{errors.password.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={mutation.isPending}
        className="w-full flex justify-center py-4 px-8 border border-transparent rounded-3xl text-lg font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {mutation.isPending ? 'Регистрация...' : 'Зарегистрировать организацию'}
      </button>

      {message && <div className="text-green-600 text-sm text-center">{message}</div>}
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
    </form>
  );
};