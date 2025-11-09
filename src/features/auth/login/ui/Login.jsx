import { useState } from 'react';
import { FormField, TextInput } from '../../../../shared/components/forms';
import { useLogin } from '../model/useLogin';
import useCaptcha from '../model/useCaptcha';
import { Link } from 'react-router-dom';

const Login = ({ setCurrentStage, isLoading }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, isError, errorMessage } = useLogin();
  const {
    value: captchaValue,
    handleChange: handleCaptchaChange,
    validate: validateCaptcha,
    refresh: refreshCaptcha,
    error: captchaError,
    isRefreshing: isCaptchaRefreshing,
    CaptchaCanvas,
  } = useCaptcha({ length: 6 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) return;

    if (!validateCaptcha()) return;

    login({
      email_or_phone: emailOrPhone,
      password,
    });
  };

  if (isLoading) {
    return (
      <div className="py-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
      <form onSubmit={handleSubmit} className="space-y-8">
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
          <div className='ml-4 text-sm text-gray-500'>
            <Link to="/auth/forgot-password" className="text-primary hover:underline">
              Забыли пароль?
            </Link>
          </div>
        </FormField>

        <FormField label="Подтвердите, что вы человек" required>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50/40 px-6 py-4 shadow-inner">
                <CaptchaCanvas reloadColor="#ef4444" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <TextInput
                  type="text"
                  value={captchaValue}
                  onChange={(e) => handleCaptchaChange(e.target.value)}
                  placeholder="Введите символы с изображения"
                  required
                  className="pr-32"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="absolute top-1/2 -translate-y-1/2 right-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isCaptchaRefreshing}
                >
                  Обновить
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            </div>
            {captchaError && (
              <p className="text-sm text-red-600 text-center">{captchaError}</p>
            )}
          </div>
        </FormField>
        {isError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm text-center">
              {errorMessage || 'Ошибка при входе'}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-3xl transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          disabled={isPending}
        >
          {isPending && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {isPending ? 'Вход...' : 'Войти'}
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
