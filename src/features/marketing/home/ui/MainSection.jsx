import { Link } from 'react-router-dom';

const MainSection = () => {
    const servicesLegal = [
        { name: 'Корпоративное право' },
        { name: 'Налоговое право' },
        { name: 'Трудовое право' },
    ];

    const servicesPrivate = [
        { name: 'Семейное право' },
        { name: 'Жилищное право' },
        { name: 'Наследственное право' },
    ];

    return (
        <div className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Services Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24">
                    {/* Legal Services */}
                    <div className="bg-white border-2 border-red-200 p-8 md:p-12 rounded-3xl">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 text-center">
                            Бизнесу
                        </h2>
                        <div className="space-y-5 mb-10">
                            {servicesLegal.map((service, index) => (
                                <div key={index} className="flex items-center p-5 border border-gray-100 rounded-xl hover:border-red-200 transition-colors duration-200">
                                    <div className="w-10 h-10 bg-red-50 border-2 border-red-200 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-5">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-medium text-lg">{service.name}</span>
                                </div>
                            ))}
                        </div>
                        <Link 
                            to="/ServicesBusiness" 
                            className="block w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-3xl text-center transition-colors duration-200"
                        >
                            Подробнее
                        </Link>
                    </div>

                    {/* Private Services */}
                    <div className="bg-white border-2 border-red-200 p-8 md:p-12 rounded-3xl">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 text-center">
                            Частным лицам
                        </h2>
                        <div className="space-y-5 mb-10">
                            {servicesPrivate.map((service, index) => (
                                <div key={index} className="flex items-center p-5 border border-gray-100 rounded-xl hover:border-red-200 transition-colors duration-200">
                                    <div className="w-10 h-10 bg-red-50 border-2 border-red-200 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-5">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 font-medium text-lg">{service.name}</span>
                                </div>
                            ))}
                        </div>
                        <Link 
                            to="/ServicesPrivate" 
                            className="block w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-3xl text-center transition-colors duration-200"
                        >
                            Подробнее
                        </Link>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="bg-white border-2 border-red-200 p-8 md:p-12 rounded-3xl">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-12 text-center">
                        Аналитические материалы
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {/* Text Content */}
                        <div className="md:col-span-1">
                            <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                                    Суд и таможня: усиление контроля за качеством вводимой продукции
                                </h3>
                                <Link 
                                    to="/analytics" 
                                    className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
                                >
                                    Читать далее
                                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Progress Circle */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="relative flex items-center justify-center">
                                <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 100 100">
                                    {/* Background circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#f3f4f6"
                                        strokeWidth="8"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="8"
                                        strokeDasharray="283"
                                        strokeDashoffset="40"
                                        strokeLinecap="round"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-800">86%</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Bar Chart */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="flex items-end space-x-3 h-32 md:h-40">
                                <div className="w-8 md:w-10 bg-red-100 border-2 border-red-200 h-16 md:h-20 rounded-t"></div>
                                <div className="w-8 md:w-10 bg-gray-100 border-2 border-gray-200 h-28 md:h-36 rounded-t"></div>
                                <div className="w-8 md:w-10 bg-gray-100 border-2 border-gray-200 h-20 md:h-24 rounded-t"></div>
                                <div className="w-8 md:w-10 bg-gray-100 border-2 border-gray-200 h-24 md:h-32 rounded-t"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Button */}
                    <div className="text-center mt-12">
                        <Link 
                            to="/analytics" 
                            className="inline-block bg-red-400 hover:bg-red-500 text-white font-semibold py-4 px-8 rounded-3xl transition-colors duration-200"
                        >
                            Перейти к другим разделам
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSection;