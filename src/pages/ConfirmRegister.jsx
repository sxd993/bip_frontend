import { EnterCodeForm } from '../features/auth/confirm-register/ui/EnterCodeForm';
import { useConfirmRegister } from './hooks/useConfirmRegister';

export const ConfirmRegister = () => {
  const {
    handleSubmit,
    formState,
    onSubmit,
    isPending,
    isError,
    errorMessage,
    codeValues,
    inputRefs,
    handleCodeInput,
    handleKeyDown,
    handlePaste,
    isSubmitDisabled,
    timer,
    formatTimer,
    isResending,
    resendError,
    handleResendCode,
  } = useConfirmRegister();

  return (
    <section className="bg-white py-15">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 hidden lg:block">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-5">Зарегистрироваться</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <article className="p-4 sm:p-6 lg:p-8 bg-secondary rounded-lg">
            <header className="text-center mb-2">
              <p className="text-white text-sm sm:text-base lg:text-lg italic opacity-80 leading-tight">
                Вам на почту было направлено письмо с подтверждением регистрации. 
                <br />
                Введите код из него, чтобы завершить регистрацию.
              </p>
            </header>

            <div className="mt-0">
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                <div className="flex justify-center">
                  <EnterCodeForm
                    handleSubmit={handleSubmit(onSubmit)}
                    formState={formState}
                    codeValues={codeValues}
                    inputRefs={inputRefs}
                    handleCodeInput={handleCodeInput}
                    handleKeyDown={handleKeyDown}
                    handlePaste={handlePaste}
                    isPending={isPending}
                    isError={isError}
                    errorMessage={errorMessage}
                  />
                </div>

                <div className="flex justify-center">
                  <div className="flex gap-2 sm:gap-3 lg:gap-4 relative pb-10 sm:pb-10 lg:pb-0">
                    <div className="text-white text-xs sm:text-sm lg:text-base w-12 sm:w-14 lg:w-16">
                      {formatTimer(timer)}
                    </div>
                    <div className="w-12 sm:w-14 lg:w-16"></div>
                    <div className="w-12 sm:w-14 lg:w-16"></div>
                    <div className="w-12 sm:w-14 lg:w-16"></div>
                    <div className="w-12 sm:w-14 lg:w-16"></div>
                    <div className="w-12 sm:w-14 lg:w-16"></div>
                    <div className="absolute right-0 text-white text-xs sm:text-sm lg:text-base text-right leading-tight">
                      <div className="mb-0">Не пришел код?</div>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={timer > 0 || isResending}
                        className="text-white font-medium text-xs sm:text-sm lg:text-base italic disabled:opacity-100 disabled:text-white disabled:cursor-not-allowed hover:underline"
                      >
                        {isResending ? 'Отправляем...' : 'Запросить снова'}
                      </button>
                      {resendError && (
                        <div className="text-red-300 text-xs mt-1">{resendError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="flex mt-6 sm:mt-8">
            <div className="w-1/2"></div>
            <div className="w-1/2 flex justify-end">
              <button
                type="submit"
                form="confirm-register-form"
                disabled={isSubmitDisabled}
                className={`flex items-center justify-center bg-primary text-white font-bold py-2 sm:py-3 px-4 sm:px-6 lg:px-8 xl:px-12 rounded-lg text-sm sm:text-base lg:text-lg transition w-full ${
                  isSubmitDisabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
              >
                {isPending ? 'Отправляем...' : 'продолжить'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};