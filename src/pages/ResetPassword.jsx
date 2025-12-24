import { useResetPasswordForm } from '@/features/auth/reset-password/model/hooks/useResetPasswordForm';
import { ResetPasswordForm } from '@/features/auth/reset-password/ui/ResetPasswordForm';

const ResetPassword = () => {
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
  } = useResetPasswordForm();

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 hidden md:block">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-5">Установка нового пароля</h1>
        </div>

        <div className="max-w-xl mx-auto">
          <article className="p-4 sm:p-6 md:p-8 bg-secondary rounded-lg">
            <div className="mt-0">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                <ResetPasswordForm
                  handleSubmit={handleSubmit(onSubmit)}
                  formState={formState}
                  passwordField={passwordField}
                  confirmPasswordField={confirmPasswordField}
                  isPending={isPending}
                  isSuccess={isSuccess}
                  isError={isError}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </article>

          {!isSuccess && (
            <div className="flex justify-end mt-6 sm:mt-8">
              <button
                type="submit"
                form="reset-password-form"
                disabled={isSubmitDisabled}
                className={`flex items-center justify-center bg-primary text-white font-bold py-2 px-4 sm:px-6 md:px-8 rounded-lg text-sm sm:text-base md:text-lg transition w-full md:w-1/2 ${
                  isSubmitDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {isPending ? 'Сохранение...' : 'подтвердить'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

