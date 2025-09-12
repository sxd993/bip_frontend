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
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Наши услуги</h2>
                    <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Выберите категорию услуг для получения подробной информации</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {/* Legal Services */}
                    <div className="bg-white border-2 border-red-200 p-8 md:p-12 rounded-3xl">
                        <div className="text-center mb-10">
                            <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                                    Бизнесу
                                </h3>
                            </div>
                        </div>
                        <div className="space-y-5 mb-12">
                            {servicesLegal.map((service, index) => (
                                <div key={index} className="flex items-center p-4 border-2 border-gray-200 rounded-2xl">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-4"></div>
                                    <span className="text-gray-800 font-semibold text-base md:text-lg tracking-wide">{service.name}</span>
                                </div>
                            ))}
                        </div>
                        <Link 
                            to="/ServicesBusiness" 
                            className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-3xl text-center transition-colors duration-300"
                        >
                            Подробнее
                        </Link>
                    </div>

                    {/* Private Services */}
                    <div className="bg-white border-2 border-red-200 p-8 md:p-12 rounded-3xl">
                        <div className="text-center mb-10">
                            <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                                    Частным лицам
                                </h3>
                            </div>
                        </div>
                        <div className="space-y-5 mb-12">
                            {servicesPrivate.map((service, index) => (
                                <div key={index} className="flex items-center p-4 border-2 border-gray-200 rounded-2xl">
                                    <div className="w-2 h-2 bg-red-400 rounded-full mr-4"></div>
                                    <span className="text-gray-800 font-semibold text-base md:text-lg tracking-wide">{service.name}</span>
                                </div>
                            ))}
                        </div>
                        <Link 
                            to="/ServicesPrivate" 
                            className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-3xl text-center transition-colors duration-300"
                        >
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSection;