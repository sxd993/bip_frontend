import { useForgotPasswordForm } from '../model/hooks/useForgotPasswordForm';

export const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState,
    emailField,
    onSubmit,
    isPending,
    isSuccess,
    isError,
    errorMessage,
    isSubmitDisabled,
    buttonClassName,
  } = useForgotPasswordForm();

  const { errors } = formState;

  if (isSuccess) {
    return (
      <div className="bg-white p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Письмо отправлено</h2>
        <p className="text-gray-600 mb-6">
          Проверьте почту. Если письма нет, посмотрите папку Спам.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          {...emailField}
          disabled={isPending}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>
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
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};

