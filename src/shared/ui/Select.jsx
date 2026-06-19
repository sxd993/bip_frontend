export const Select = ({ hasError = false, className = '', children, ...props }) => (
  <select
    className={[
      'w-full rounded-xl border bg-surface px-4 py-3 text-base text-text outline-none transition focus:border-primary',
      hasError ? 'border-error' : 'border-border',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </select>
);
