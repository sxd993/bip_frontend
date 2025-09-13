export const Loading = ({ size = 'large', text = 'Загрузка...', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6', 
    large: 'h-8 w-8',
    xlarge: 'h-12 w-12'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-red-600 ${sizeClasses[size]}`}></div>
      {text && (
        <p className={`mt-2 text-gray-600 font-medium ${textSizes[size]}`}>{text}</p>
      )}
    </div>
  );
};
