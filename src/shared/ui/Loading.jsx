export const Loading = ({
  size = 'large',
  text = 'Загрузка',
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8',
    xlarge: 'h-12 w-12',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  };

  const content = (
    <div className={['flex flex-col items-center justify-center', className].filter(Boolean).join(' ')}>
      <div
        className={`animate-spin rounded-full border-b-2 border-red-600 ${sizeClasses[size]}`}
      />
      {text && (
        <p className={`mt-2 font-medium text-text-muted ${textSizes[size]}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        {content}
      </div>
    );
  }

  return content;
};
