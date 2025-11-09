import { useResetPasswordForm } from '../model/useResetPasswordForm';

export const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState,
    passwordField,
    confirmPasswordField,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    isSubmitDisabled,
    buttonClassName,
  } = useResetPasswordForm();

  const { errors } = formState;

  if (isSuccess) {
    return (
      <div className="bg-white border-2 border-red-200 rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Пароль успешно изменён</h2>
        <p className="text-gray-600">Перенаправляем на страницу входа...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Новый пароль
        </label>
        <input
          type="password"
          placeholder="Минимум 6 символов"
          {...passwordField}
          disabled={isPending}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Подтвердите пароль
        </label>
        <input
          type="password"
          placeholder="Повторите пароль"
          {...confirmPasswordField}
          disabled={isPending}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword.message}</span>
        )}
      </div>

      {isError && errorMessage && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-2xl p-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={buttonClassName}
      >
        {isPending ? 'Сохранение...' : 'Сохранить пароль'}
      </button>
    </form>
  );
};

