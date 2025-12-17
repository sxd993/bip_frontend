import { ForgotPasswordForm } from '../features/auth/reset-password/ui/ForgotPasswordForm';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Восстановление пароля</h1>
          <div className="w-24 h-1 bg-red-200 mx-auto"></div>
        </div>

        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="text-red-500 font-medium hover:text-red-600"
            >
              Вернуться к входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;