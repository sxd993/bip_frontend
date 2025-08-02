import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerLegalEntityApi } from '../../../api/auth/registerApi';
import { useNavigate } from 'react-router-dom';

export const LegalRegister = () => {
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

    const legalEntityMutation = useMutation({
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

        setMessage('');
        setError('');
        const formData = {
            ...data,
            phone: normalizedPhone,
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