import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerPhysicalPersonApi } from '../../../api/auth/registerApi';

export const PhysicalRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const phoneValue = watch('phone');

  const physicalPersonMutation = useMutation({
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

  const formatPhoneForDisplay = (digits) => {
    if (!digits || digits.length < 1) return '+7 ';

    if (digits.startsWith('8')) {
      digits = digits.slice(1);
    } else if (digits.startsWith('7')) {
      digits = digits.slice(1);
    }

    let formatted = '+7 ';
    if (digits.length > 0) formatted += digits.slice(0, 3);
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
    if (digits.length > 6) formatted += '-' + digits.slice(6, 8);
    if (digits.length > 8) formatted += '-' + digits.slice(8, 10);
    return formatted;
  };

  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '');

    if (raw.length === 0) {
      setValue('phone', '+7 ');
      return;
    }

    if (raw.startsWith('8')) {
      raw = '7' + raw.slice(1);
    } else if (raw.length === 10 && !raw.startsWith('7')) {
      raw = '7' + raw;
    }

    if (raw.length > 11) {
      raw = raw.slice(0, 11);
    }

    const displayValue = formatPhoneForDisplay(raw);
    setValue('phone', displayValue);
  };

  const onSubmit = (data) => {
    const digitsOnly = data.phone.replace(/\D/g, '');
    let normalizedPhone = digitsOnly;

    if (digitsOnly.length === 10) {
      normalizedPhone = '7' + digitsOnly;
    } else if (digitsOnly.startsWith('8')) {
      normalizedPhone = '7' + digitsOnly.slice(1);
    }

    const payload = {
      ...data,
      phone: normalizedPhone,
    };

    setMessage('');
    setError('');
    physicalPersonMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Логин</label>
        <input
          type="text"
          {...register('login', { required: 'Обязательное поле' })}
        />
        {errors.login && <span className="error-message">{errors.login.message}</span>}
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
        <label>Номер телефона</label>
        <input
          type="tel"
          value={phoneValue || '+7 '}
          {...register('phone', {
            required: 'Обязательное поле',
            validate: (value) => {
              const digitsOnly = value.replace(/\D/g, '');
              if (!/^[78]?\d{10}$/.test(digitsOnly)) {
                return 'Некорректный формат номера телефона';
              }
              return true;
            },
          })}
          onChange={handlePhoneChange}
          onKeyDown={(e) => {
            if (e.target.selectionStart <= 3 && (e.key === 'Backspace' || e.key === 'Delete')) {
              e.preventDefault();
            }
          }}
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
        <label>Дата рождения</label>
        <input
          type="date"
          {...register('birthdate', { required: 'Обязательное поле' })}
        />
        {errors.birthdate && <span className="error-message">{errors.birthdate.message}</span>}
      </div>

      <button type="submit">Зарегистрироваться</button>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
    </form>
  );
};
