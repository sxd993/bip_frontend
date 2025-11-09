import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при сбросе пароля');
      }

      setSuccess(true);
      
      // Очищаем кэш
      queryClient.clear();
      
      setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Пароль успешно изменён</h2>
            <p className="text-gray-600">Перенаправляем на страницу входа...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Установка нового пароля</h1>
          <div className="w-24 h-1 bg-red-200 mx-auto"></div>
        </div>

        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Новый пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подтвердите пароль
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-400"
              />
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 rounded-2xl p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-3 rounded-3xl transition-colors"
            >
              {loading ? 'Сохранение...' : 'Сохранить пароль'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;