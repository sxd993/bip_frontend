export const EnterCodeForm = ({
  handleSubmit,
  codeValues,
  inputRefs,
  handleCodeInput,
  handleKeyDown,
  handlePaste,
  isPending,
  isError,
  errorMessage,
}) => {
  return (
    <form
      id="confirm-register-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      onPaste={handlePaste}
    >
      <div className="flex gap-2 sm:gap-3 lg:gap-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={codeValues[index] || ''}
            onChange={(e) => handleCodeInput(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={isPending}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-center text-lg sm:text-xl lg:text-2xl border-2 border-white rounded-lg bg-white text-primary focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
          />
        ))}
      </div>

      {isError && errorMessage && (
        <span className="text-red-300 text-sm text-center">{errorMessage}</span>
      )}

      <button type="submit" className="hidden" aria-hidden="true" />
    </form>
  )
}
