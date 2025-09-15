import { useState } from 'react';
import AppealsSection from '../../../deals/components/Appeals/AppealsSection';

export const LegalAccount = ({ user, companyData, employeesData, isLoadingCompany, isLoadingEmployees }) => {
    const [activeSection, setActiveSection] = useState('employee');
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
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Личный кабинет юридического лица</h1>
                    <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Управление компанией и сотрудниками</p>
                </div>

                <div className="bg-white border-2 border-red-200 rounded-3xl overflow-hidden mb-8">
                    {/* Вкладки */}
                    <div className="flex border-b-2 border-red-200 overflow-x-auto">
                        <button
                            type="button"
                            className={`flex-1 px-3 py-3 font-medium text-sm ${activeSection === 'employee'
                                ? 'bg-red-500 text-white border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => setActiveSection('employee')}
                        >
                            Сотрудник
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-3 py-3 font-medium text-sm ${activeSection === 'appeals'
                                ? 'bg-red-500 text-white border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => setActiveSection('appeals')}
                        >
                            Обращения
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-3 py-3 font-medium text-sm ${activeSection === 'company'
                                ? 'bg-red-500 text-white border-b-2 border-red-500'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => setActiveSection('company')}
                        >
                            Компания
                        </button>
                        {user.role === 'Руководитель' && (
                            <button
                                type="button"
                                className={`flex-1 px-3 py-3 font-medium text-sm ${activeSection === 'employees'
                                    ? 'bg-red-500 text-white border-b-2 border-red-500'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                    }`}
                                onClick={() => setActiveSection('employees')}
                            >
                                Управление
                            </button>
                        )}
                    </div>

                    {/* Содержимое вкладок */}
                    <div className="p-8 md:p-12">
                        {activeSection === 'employee' && (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Данные сотрудника</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">ФИО</span>
                                        <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                                    </div>
                                    <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                        <span className="block text-sm font-medium text-gray-600 mb-2">Роль</span>
                                        <span className="text-lg text-gray-800">{user.role}</span>
                                    </div>
                                    {user.position && (
                                        <div className="border-2 border-gray-100 p-6 rounded-2xl">
                                            <span className="block text-sm font-medium text-gray-600 mb-2">Должность</span>
                                            <span className="text-lg text-gray-800">{user.position}</span>
                                        </div>
                                    )}
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

                        {activeSection === 'company' && (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Данные компании</h2>
                                    </div>
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

                                {/* Токен приглашения - только для руководителя */}
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

                        {activeSection === 'employees' && user.role === 'Руководитель' && (
                            <div>
                                <div className="text-center mb-8">
                                    <div className="inline-block border border-red-200 rounded-2xl px-6 py-3 bg-red-100/50">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Управление сотрудниками</h2>
                                    </div>
                                </div>


                                {isLoadingEmployees ? (
                                    <div className="text-gray-600 text-center py-8">Загрузка списка сотрудников...</div>
                                ) : employeesData?.employees ? (
                                    <div>
                                        <div className="mb-6">
                                            <h4 className="text-lg font-medium text-gray-700">Всего сотрудников: {employeesData.total_count}</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {employeesData.employees.map((employee) => (
                                                <div key={employee.id} className="bg-red-50 p-4 rounded-2xl border-2 border-red-200">
                                                    <div className="font-semibold text-gray-800 mb-2">
                                                        {employee.full_name}
                                                    </div>
                                                    <div className="space-y-1 mb-3">
                                                        <span className="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full">{employee.role}</span>
                                                        {employee.position && (
                                                            <span className="block text-sm text-gray-600">{employee.position}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <div>{employee.phone}</div>
                                                        <div>{employee.email}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-600 text-center py-8">Нет сотрудников</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};