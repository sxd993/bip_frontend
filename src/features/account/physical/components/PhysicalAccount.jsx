import { useState } from 'react';
import { Loading } from '../../../../shared/ui/Loading';
import AppealsSection from '../../../deals/components/Appeals/AppealsSection';

export const PhysicalAccount = ({ user, isLoading }) => {
    const [activeSection, setActiveSection] = useState('personal');

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Личный кабинет физического лица</h1>
                    <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Управление вашими данными и услугами</p>
                </div>

                <div className="bg-white border-2 border-red-200 rounded-3xl overflow-hidden">
                    {/* Вкладки */}
                    <div className="flex border-b-2 border-red-200 overflow-x-auto">
                        <button
                            type="button"
                            className={`flex-1 px-4 py-3 text-sm font-medium ${activeSection === 'personal'
                                ? 'bg-red-500 text-white border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => setActiveSection('personal')}
                        >
                            Персональные данные
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-4 py-3 text-sm font-medium ${activeSection === 'appeals'
                                ? 'bg-red-500 text-white border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => setActiveSection('appeals')}
                        >
                            Обращения
                        </button>
                    </div>

                    {/* Содержимое вкладок */}
                    <div className="p-8 md:p-12">
                        {activeSection === 'personal' && (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Персональные данные</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">ФИО</span>
                                        <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                                    </div>
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">Номер телефона</span>
                                        <span className="text-lg text-gray-800">{user.phone}</span>
                                    </div>
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">Электронная почта</span>
                                        <span className="text-lg text-gray-800">{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'appeals' && (
                            <div>
                                <div className="text-center mb-8">
                                </div>
                                <AppealsSection />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};