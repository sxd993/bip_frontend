export const ResetPasswordForm = ({
  handleSubmit,
  formState,
  passwordField,
  confirmPasswordField,
  isPending,
  isSuccess,
  isError,
  errorMessage,
}) => {
  const { errors } = formState;

  if (isSuccess) {
    return (
      <div className="w-full">
        <p className="text-white text-sm sm:text-base md:text-lg text-center">
          Пароль успешно изменён
        </p>
      </div>
    );
  }

  return (
    <form
      id="reset-password-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <p className="text-white text-sm sm:text-base md:text-lg italic opacity-80 leading-tight text-center">
        Пароль должен состоять из 6 символов
      </p>

      <div className="w-full">
        <input
          type="password"
          placeholder="Придумайте новый пароль"
          {...passwordField}
          disabled={isPending}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-white text-primary focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.password && (
          <span className="text-red-300 text-sm mt-1 block text-center">{errors.password.message}</span>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          placeholder="Повторите пароль"
          {...confirmPasswordField}
          disabled={isPending}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-white text-primary focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.confirmPassword && (
          <span className="text-red-300 text-sm mt-1 block text-center">{errors.confirmPassword.message}</span>
        )}
      </div>

      {isError && errorMessage && (
        <span className="text-red-300 text-sm text-center">{errorMessage}</span>
      )}

      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
};

