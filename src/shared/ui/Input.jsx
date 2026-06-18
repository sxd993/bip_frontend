export const Input = ({ hasError = false, className = '', ...props }) => (
  <input
    className={[
      'w-full rounded-xl border bg-surface px-4 py-3 text-base text-text outline-none transition placeholder:text-text-muted focus:border-primary',
      hasError ? 'border-error' : 'border-border',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
