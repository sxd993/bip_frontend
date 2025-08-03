import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerPhysicalPersonApi } from '../../../api/auth/registerApi';
import { Loading} from '../../../components/Loading';
import { normalizePhoneForServer, handlePhoneInput, validatePhone, handlePhoneKeyDown } from '../../../utils/RegisterUtils/phoneUtils';

export const PhysicalRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const phoneValue = watch('phone');

  const mutation = useMutation({
    mutationFn: registerPhysicalPersonApi,
    onSuccess: (data) => {
      setMessage('Регистрация успешна!');
      setError('');
      queryClient.setQueryData(['user'], data);
      setTimeout(() => navigate('/personal-account'), 1500);
    },
    onError: (error) => {
      setError(error.response?.data?.detail || 'Ошибка регистрации');
      setMessage('');
    },
  });

  const onSubmit = (data) => {
    setMessage('');
    setError('');
    
    const payload = {
      ...data,
      phone: normalizePhoneForServer(data.phone),
    };

    mutation.mutate(payload);
  };

  if (mutation.isPending) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label>Пароль</label>
        <input
          type="password"
          {...register('password', { required: 'Обязательное поле' })}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
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
        <input type="text" {...register('second_name')} />
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
        <label>Дата рождения</label>
        <input
          type="date"
          {...register('birthdate', { required: 'Обязательное поле' })}
        />
        {errors.birthdate && <span className="error-message">{errors.birthdate.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </form>
  );
};