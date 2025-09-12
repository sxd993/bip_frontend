import { Link } from 'react-router-dom';

const UnderDevelopment = ({ title = "Страница в разработке", description = "Эта страница находится в разработке и скоро будет доступна" }) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center">
                {/* Иконка разработки */}
                <div className="w-24 h-24 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg 
                        className="w-12 h-12 text-red-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                        />
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                    </svg>
                </div>

                {/* Заголовок */}
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    {title}
                </h1>

                {/* Описание */}
                <p className="text-gray-600 mb-8 text-lg">
                    {description}
                </p>

                {/* Кнопка возврата на главную */}
                <Link 
                    to="/" 
                    className="inline-block bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-8 rounded-3xl transition-colors duration-200"
                >
                    Вернуться на главную
                </Link>

                {/* Дополнительная информация */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Следите за обновлениями в наших социальных сетях
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UnderDevelopment;
