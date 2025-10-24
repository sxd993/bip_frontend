import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../../../shared/ui/Loading';
import AppealsSection from '../../../deals/ui/Appeals/AppealsSection';
import { EditPersonalDataModal } from './EditPersonalDataModal';

const VALID_SECTIONS = ['personal', 'appeals'];
const DEFAULT_SECTION = 'appeals';

export const PhysicalAccount = ({ user, isLoading }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Получаем activeSection из URL параметра
    const activeSection = searchParams.get('tab') || DEFAULT_SECTION;
    
    // Валидация: если параметр невалидный, переходим на дефолтный
    if (!VALID_SECTIONS.includes(activeSection)) {
        setSearchParams({ tab: DEFAULT_SECTION }, { replace: true });
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Функция для смены вкладки через URL
    const handleTabChange = (section) => {
        setSearchParams({ tab: section });
    };

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
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${activeSection === 'personal'
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => handleTabChange('personal')}
                        >
                            Персональные данные
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${activeSection === 'appeals'
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => handleTabChange('appeals')}
                        >
                            Обращения
                        </button>
                    </div>

                    {/* Содержимое вкладок */}
                    <div className="p-8 md:p-12">
                        {activeSection === 'personal' && (
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Персональные данные</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl transition-colors duration-300 flex items-center gap-2 font-bold text-sm md:text-base"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Редактировать
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">ФИО</span>
                                        <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                                    </div>
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">Номер телефона</span>
                                        <span className="text-lg text-gray-800">{user.phone}</span>
                                    </div>
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl hover:border-red-200 transition-colors duration-200">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">Электронная почта</span>
                                        <span className="text-lg text-gray-800">{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'appeals' && (
                            <div>
                                <AppealsSection />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditPersonalDataModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </div>
    );
};