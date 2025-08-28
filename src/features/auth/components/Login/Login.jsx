import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from '../../api/loginApi';

const Login = ({ currentStage, setCurrentStage }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries(['user']);
      window.location.href = '/personal-account';
    },
    onError: (error) => {
      setErrorMessage(error.response?.data?.message || 'Произошла ошибка при входе');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    mutation.mutate({ email_or_phone: emailOrPhone, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Вход в систему</h2>
            <p className="text-gray-600 mt-2">Войдите в личный кабинет для доступа к услугам</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              <input
                type="text"
                id="login"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white"
                placeholder="Email или номер телефона"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white"
                placeholder="Введите ваш пароль"
                required
              />
            </div>
            
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm text-center">{errorMessage}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Вход...' : 'Войти'}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentStage('register')}
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Нет аккаунта? Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;