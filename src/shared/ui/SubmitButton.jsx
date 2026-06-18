export const SubmitButton = ({ className = '', children, ...props }) => (
  <button
    type="submit"
    className={[
      'w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-on-primary transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </button>
);
