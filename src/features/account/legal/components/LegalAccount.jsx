import { useState } from 'react';
import { EditEmployeeDataModal } from './EditEmployeeDataModal';
import { EditCompanyDataModal } from './EditCompanyDataModal';

export const LegalAccount = ({ user, companyData, employeesData, isLoadingCompany, isLoadingEmployees }) => {
    const [activeSection, setActiveSection] = useState('employee');
    const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
    const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState(false);
    const [showToken, setShowToken] = useState(false);
    const [copiedToken, setCopiedToken] = useState(false);

    const handleCopyToken = () => {
        if (companyData?.invite_token) {
            navigator.clipboard.writeText(companyData.invite_token);
            setCopiedToken(true);
            setTimeout(() => setCopiedToken(false), 2000);
        }
    };

    return (
        <div className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* ... существующий код ... */}

                {/* Для вкладки "Сотрудник" добавить кнопку редактирования */}
                {activeSection === 'employee' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Данные сотрудника</h2>
                            </div>
                            <button
                                onClick={() => setIsEditEmployeeModalOpen(true)}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl transition-colors duration-300 flex items-center gap-2 font-bold text-sm md:text-base"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Редактировать
                            </button>
                        </div>
                        {/* остальной код */}
                    </div>
                )}

                {/* Для вкладки "Компания" добавить кнопку редактирования */}
                {activeSection === 'company' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Данные компании</h2>
                            </div>
                            {user.role === 'Руководитель' && (
                                <button
                                    onClick={() => setIsEditCompanyModalOpen(true)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl transition-colors duration-300 flex items-center gap-2 font-bold text-sm md:text-base"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Редактировать
                                </button>
                            )}
                        </div>
                        {isLoadingCompany ? (
                            <div className="text-gray-600 text-center py-8">Загрузка данных компании...</div>
                        ) : companyData ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                    <span className="block text-sm font-medium text-gray-600 mb-2">Название компании</span>
                                    <span className="text-lg text-gray-800">{companyData.name}</span>
                                </div>
                                <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                    <span className="block text-sm font-medium text-gray-600 mb-2">ИНН</span>
                                    <span className="text-lg text-gray-800">{companyData.inn}</span>
                                </div>
                                <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                    <span className="block text-sm font-medium text-gray-600 mb-2">Количество сотрудников</span>
                                    <span className="text-lg text-gray-800">{companyData.employees_count}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-600 text-center py-8">Данные компании недоступны</div>
                        )}

                        {user.role === 'Руководитель' && companyData?.invite_token && (
                            <div className="mt-8">
                                <div className="text-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Токен приглашения</h2>
                                    </div>
                                </div>
                                <div className="bg-white border-2 border-red-200 rounded-3xl p-6">
                                    <p className="text-gray-600 mb-6 text-center">
                                        Передайте этот токен сотрудникам для регистрации в компании
                                    </p>
                                    {showToken ? (
                                        <div className="space-y-4">
                                            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4">
                                                <code className="font-mono text-sm break-all text-gray-800">{companyData.invite_token}</code>
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    className="bg-red-500 text-white px-6 py-3 rounded-3xl hover:bg-red-600 transition-colors duration-300 font-bold"
                                                    onClick={handleCopyToken}
                                                >
                                                    {copiedToken ? '✓ Скопировано' : 'Копировать токен'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-red-500 text-white px-6 py-3 rounded-3xl hover:bg-red-600 transition-colors duration-300 font-bold"
                                                onClick={() => setShowToken(true)}
                                            >
                                                Показать токен
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Модальные окна */}
                <EditEmployeeDataModal 
                    isOpen={isEditEmployeeModalOpen}
                    onClose={() => setIsEditEmployeeModalOpen(false)}
                    user={user}
                />

                <EditCompanyDataModal 
                    isOpen={isEditCompanyModalOpen}
                    onClose={() => setIsEditCompanyModalOpen(false)}
                    companyData={companyData}
                />
            </div>
        </div>
    );
};