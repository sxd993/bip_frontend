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
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-10">
        <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Вход в систему</h2>
        </div>
      </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-3">
                Логин
              </label>
              <input
                type="text"
                id="login"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
                placeholder="Email или номер телефона"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-colors duration-200"
                placeholder="Введите ваш пароль"
                required
              />
            </div>
            
            {errorMessage && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm text-center">{errorMessage}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-3xl transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default Login;