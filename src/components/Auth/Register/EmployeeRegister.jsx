import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerEmployeeApi } from '../../../api/auth/registerApi';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../components/Loading';
import { normalizePhoneForServer, handlePhoneInput, validatePhone, handlePhoneKeyDown } from '../../../utils/RegisterUtils/phoneUtils';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Токен компании</label>
        <input
          type="text"
          {...register('company_token', { 
            required: 'Обязательное поле',
            minLength: { value: 32, message: 'Токен должен содержать 32 символа' },
            maxLength: { value: 32, message: 'Токен должен содержать 32 символа' }
          })}
          placeholder="Введите 32-символьный токен от руководителя"
        />
        {errors.company_token && <span className="error-message">{errors.company_token.message}</span>}
      </div>

      <div className="form-group">
        <label>Имя</label>
        <input
          type="text"
          {...register('first_name', { required: 'Обязательное поле' })}
        />
        {errors.first_name && <span className="error-message">{errors.first_name.message}</span>}
      </div>

      <div className="form-group">
        <label>Фамилия</label>
        <input
          type="text"
          {...register('last_name', { required: 'Обязательное поле' })}
        />
        {errors.last_name && <span className="error-message">{errors.last_name.message}</span>}
      </div>

      <div className="form-group">
        <label>Отчество</label>
        <input
          type="text"
          {...register('second_name')}
        />
      </div>

      <div className="form-group">
        <label>Должность в компании</label>
        <input
          type="text"
          {...register('position', { required: 'Укажите вашу должность' })}
          placeholder="Например: Менеджер по продажам"
        />
        {errors.position && <span className="error-message">{errors.position.message}</span>}
      </div>

      <div className="form-group">
        <label>Номер телефона</label>
        <input
          type="tel"
          value={phoneValue || '+7 '}
          {...register('phone', {
            required: 'Обязательное поле',
            validate: validatePhone,
          })}
          onChange={(e) => handlePhoneInput(e, setValue)}
          onKeyDown={handlePhoneKeyDown}
        />
        {errors.phone && <span className="error-message">{errors.phone.message}</span>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Обязательное поле' })}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Пароль</label>
        <input
          type="password"
          {...register('password', { 
            required: 'Обязательное поле',
            minLength: { value: 6, message: 'Минимум 6 символов' }
          })}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Регистрация...' : 'Присоединиться к компании'}
      </button>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};