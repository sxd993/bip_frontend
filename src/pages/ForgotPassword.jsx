import { ForgotPasswordForm } from '../features/auth/reset-password/ui/ForgotPasswordForm';
import { Link } from 'react-router-dom';
import { useForgotPasswordForm } from '../features/reset-password/model/useForgotPasswordForm';

const ForgotPassword = () => {
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
  } = useForgotPasswordForm();

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 hidden md:block">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-5">Восстановление пароля</h1>
        </div>

        <div className="max-w-xl mx-auto">
          <article className="p-4 sm:p-6 md:p-8 bg-secondary rounded-lg">
            <div className="mt-0">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                <ForgotPasswordForm
                  handleSubmit={handleSubmit(onSubmit)}
                  formState={formState}
                  emailField={emailField}
                  isPending={isPending}
                  isSuccess={isSuccess}
                  isError={isError}
                  errorMessage={errorMessage}
                />
              </div>
            </div>
          </article>

          {isSuccess ? (
            <div className="flex flex-col md:flex-row mt-6 sm:mt-8 gap-4 md:gap-0 justify-between">
              <Link
                to="/auth/login"
                className="text-primary font-medium hover:opacity-90 transition-colors"
              >
                Вернуться в входу
              </Link>
              <Link
                to="/auth/forgot-password"
                className="text-primary font-medium hover:opacity-90 transition-colors md:text-right"
              >
                Письмо не пришло?
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row mt-6 sm:mt-8 gap-4 md:gap-0">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <Link
                  to="/auth/login"
                  className="text-primary font-medium hover:opacity-90 transition-colors"
                >
                  Вернуться к входу
                </Link>
              </div>
              <div className="w-full md:w-1/2 flex justify-end order-1 md:order-2">
                <button
                  type="submit"
                  form="forgot-password-form"
                  disabled={isSubmitDisabled}
                  className={`flex items-center justify-center bg-primary text-white font-bold py-2 px-4 sm:px-6 md:px-8 rounded-lg text-sm sm:text-base md:text-lg transition w-full md:w-full ${
                    isSubmitDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                  }`}
                >
                  {isPending ? 'Отправляем...' : 'отправить'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;