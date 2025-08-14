import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../../api/loginApi';
import './Login.css';

const Login = ({ currentStage, setCurrentStage }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (userData) => {
            queryClient.setQueryData(['user'], userData);
            queryClient.invalidateQueries(['user']);
            navigate('/personal-account');
        },
    });

    const errorMessage = mutation.error
        ? mutation.error.response?.data?.detail
            ? mutation.error.response.data.detail
            : mutation.error.message === 'Network Error'
                ? 'Нет соединения с сервером. Проверьте интернет или попробуйте позже.'
                : mutation.error.message || 'Произошла ошибка. Попробуйте ещё раз.'
        : '';

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email_or_phone: emailOrPhone, password });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Вход</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="login" className="input-label">
                            Логин
                        </label>
                        <input
                            type="text"
                            id="login"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            className="input-field"
                            placeholder="Email или номер телефона"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Введите ваш пароль"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}
                    <div
                        onClick={() => setCurrentStage('register')}
                        className="switch-auth-button"
                        style={{ cursor: 'pointer' }}
                    >
                        Регистрация
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;