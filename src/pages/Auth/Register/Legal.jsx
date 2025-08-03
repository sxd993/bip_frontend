import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerLegalEntityApi } from '../../../api/auth/registerApi';
import { useNavigate } from 'react-router-dom';
import { Loading} from '../../../components/Loading';
import { normalizePhoneForServer, handlePhoneInput, validatePhone, handlePhoneKeyDown } from '../../../utils/RegisterUtils/phoneUtils';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Название организации</label>
        <input
          type="text"
          {...register('company_name', { required: 'Обязательное поле' })}
        />
        {errors.company_name && <span className="error-message">{errors.company_name.message}</span>}
      </div>

      <div className="form-group">
        <label>ИНН</label>
        <input
          type="text"
          {...register('inn', { required: 'Обязательное поле' })}
        />
        {errors.inn && <span className="error-message">{errors.inn.message}</span>}
      </div>

      <div className="form-group">
        <label>Имя руководителя</label>
        <input
          type="text"
          {...register('employee_first_name', { required: 'Обязательное поле' })}
        />
        {errors.employee_first_name && <span className="error-message">{errors.employee_first_name.message}</span>}
      </div>

      <div className="form-group">
        <label>Фамилия руководителя</label>
        <input
          type="text"
          {...register('employee_second_name', { required: 'Обязательное поле' })}
        />
        {errors.employee_second_name && <span className="error-message">{errors.employee_second_name.message}</span>}
      </div>

      <div className="form-group">
        <label>Отчество руководителя</label>
        <input
          type="text"
          {...register('employee_last_name', { required: 'Обязательное поле' })}
        />
        {errors.employee_last_name && <span className="error-message">{errors.employee_last_name.message}</span>}
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
          {...register('password', { required: 'Обязательное поле' })}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Регистрация...' : 'Зарегистрировать организацию'}
      </button>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};