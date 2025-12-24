export const ForgotPasswordForm = ({
  handleSubmit,
  formState,
  emailField,
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
          Письмо отправлено, проверьте почту
        </p>
      </div>
    );
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <div className="w-full">
        <input
          type="email"
          placeholder="Почта"
          {...emailField}
          disabled={isPending}
          className="w-full px-4 py-2 border-2 border-white rounded-lg bg-white text-primary focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
        />
        {errors.email && (
          <span className="text-red-300 text-sm mt-1 block text-center">{errors.email.message}</span>
        )}
      </div>

      <p className="text-white text-sm sm:text-base md:text-lg italic opacity-80 leading-tight text-center">
        Вам на почту будет направлено письмо с ссылкой, при переходе по которой возможно обновить пароль.
      </p>

      {isError && errorMessage && (
        <span className="text-red-300 text-sm text-center">{errorMessage}</span>
      )}

      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  );
};