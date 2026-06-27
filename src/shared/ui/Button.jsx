const VARIANT_CLASSES = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover font-semibold',
  outline:
    'border border-border bg-surface text-text hover:border-primary hover:text-primary font-medium',
};

export const Button = ({
  variant = 'primary',
  type = 'button',
  fullWidth,
  className = '',
  children,
  ...props
}) => {
  const isSubmit = type === 'submit';
  const resolvedFullWidth = fullWidth ?? isSubmit;

  return (
    <button
      type={type}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-50',
        isSubmit && 'text-base',
        resolvedFullWidth && 'w-full',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
