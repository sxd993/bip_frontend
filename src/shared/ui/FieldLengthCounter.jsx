export const FieldLengthCounter = ({ value = '', min, max, className = '' }) => {
  const length = String(value ?? '').length;
  const trimmedLength = String(value ?? '').trim().length;
  const isTooShort = min && trimmedLength > 0 && trimmedLength < min;
  const isTooLong = max && length > max;

  return (
    <span
      className={[
        'text-xs tabular-nums',
        isTooShort || isTooLong ? 'text-error' : 'text-text-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {length} / {max}
    </span>
  );
};
