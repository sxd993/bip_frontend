import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerLegalEntityApi } from '../../../api/auth/registerApi';
import { useNavigate } from 'react-router-dom';

export const LegalRegister = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const legalEntityMutation = useMutation({
        mutationFn: registerLegalEntityApi,
        onSuccess: (data) => {
            setMessage('Регистрация юридического лица успешна!');
            setError('');

            // Обновляем кэш пользователя
            queryClient.setQueryData(['user'], data);

            setTimeout(() => {
                navigate('/personal-account');
            }, 2000);
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
            login: data.phone
        };
        legalEntityMutation.mutate(formData);
    };

    return (
        <>
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
                </div>
                <div className="form-group">
                    <label>Фамилия руководителя</label>
                    <input
                        type="text"
                        {...register('employee_second_name', { required: 'Обязательное поле' })}
                    />
                </div>
                <div className="form-group">
                    <label>Отчество руководителя</label>
                    <input
                        type="text"
                        {...register('employee_last_name', { required: 'Обязательное поле' })}
                    />
                </div>
                <div className="form-group">
                    <label>Телефон</label>
                    <input
                        type="text"
                        {...register('phone', { required: 'Обязательное поле' })}
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
                </div>
                <button type="submit">Зарегистрировать организацию</button>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </form>
        </>
    );
};