const SuccessScreen = ({ 
    title = "Операция выполнена!",
    description = "Ваш запрос успешно обработан.",
    iconSize = "w-16 h-16"
  }) => {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center text-center">
        <div className={`${iconSize} rounded-full border-2 border-red-500 flex items-center justify-center mb-3 bg-red-50`}>
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-800 text-lg font-bold">{title}</p>
        {description && (
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        )}
      </div>
    );
  };
  
  export default SuccessScreen;