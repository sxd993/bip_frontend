import { useState } from 'react';
import { FormField, TextInput } from '../../../../shared/components/forms';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ setCurrentStage, isLoading }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const { loginMutation, isLoginPending } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) return;

    loginMutation.mutate({
      email_or_phone: emailOrPhone,
      password,
    });
  };

  console.log(isLoginPending)
  if (isLoading) {
    return (
      <div className="py-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Авторизация
            </h1>
            <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              Войдите в систему или создайте новый аккаунт
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-10">
        <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Вход в систему</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {loginMutation.isError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm text-center">
              {loginMutation.errorMessage || 'Ошибка при входе'}
            </p>
          </div>
        )}

        <FormField label="Логин" required>
          <TextInput
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Email или номер телефона"
            required
          />
        </FormField>

        <FormField label="Пароль" required>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите ваш пароль"
            required
          />
        </FormField>

        <button
          type="submit"
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-3xl transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          disabled={isLoginPending}
        >
          {isLoginPending && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {isLoginPending ? 'Вход...' : 'Войти'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setCurrentStage('register')}
            className="font-medium transition-colors duration-200"
          >
            <span className="text-gray-600">Нет аккаунта? </span>
            <span className="text-red-600 hover:text-red-700">Зарегистрироваться</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
