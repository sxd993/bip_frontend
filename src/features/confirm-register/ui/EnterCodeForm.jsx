import { useEnterCodeForm } from "../model/useEnterCodeForm"

export const EnterCodeForm = () => {
  const { handleSubmit, formState, codeField, onSubmit, isPending, isError, errorMessage } = useEnterCodeForm()
  const { errors, isValid } = formState
  const isSubmitDisabled = !isValid || isPending


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Введите 6-значный код"
        {...codeField}
        maxLength={6}
        disabled={isPending}
        className="border p-2 rounded disabled:bg-gray-100 disabled:text-gray-400"
      />

      {errors.code && (
        <span className="text-red-500 text-sm">{errors.code.message}</span>
      )}

      {isError && errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full py-4 rounded-2xl text-lg font-semibold transition ${
          isValid && !isPending
            ? "bg-red-500 text-white cursor-pointer"
            : "bg-red-300 text-white cursor-not-allowed"
        }`}
      >
        {isPending ? 'Отправляем...' : 'Подтвердить и продолжить'}
      </button>
    </form>
  )
}
