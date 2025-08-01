import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../../../api/auth/loginApi';
import './Login.css';

const Login = ({ currentStage, setCurrentStage }) => {
    const [login, setLogin] = useState('');
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

    let errorMessage = '';
    if (mutation.error) {
        if (mutation.error.response && mutation.error.response.data && mutation.error.response.data.detail) {
            errorMessage = mutation.error.response.data.detail;
        } else if (mutation.error.message) {
            errorMessage = mutation.error.message === 'Network Error'
                ? 'Нет соединения с сервером. Проверьте интернет или попробуйте позже.'
                : mutation.error.message;
        } else {
            errorMessage = 'Произошла ошибка. Попробуйте ещё раз.';
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ login, password });
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
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="input-field"
                            placeholder="Введите ваш логин"
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