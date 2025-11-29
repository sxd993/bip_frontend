import { ResetPasswordForm } from '../features/reset-password/ui/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Установка нового пароля</h1>
          <div className="w-24 h-1 bg-red-200 mx-auto"></div>
        </div>

        <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

