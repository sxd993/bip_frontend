import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Введите email');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка');
      }

      setSuccess(true);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Письмо отправлено</h2>
            <p className="text-gray-600 mb-6">
              Проверьте почту {email}. Если письма нет, посмотрите папку Спам.
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-3xl transition-colors"
            >
              Вернуться к входу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Восстановление пароля</h1>
          <div className="w-24 h-1 bg-red-200 mx-auto"></div>
        </div>

        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
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
              {loading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;