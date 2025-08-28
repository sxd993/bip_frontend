import { useState } from 'react';
import AppealsSection from '../../deals/components/AppealsSection';

export const LegalAccount = ({ user, companyData, employeesData, isLoadingCompany, isLoadingEmployees }) => {
    const [isOpenEmployers, setIsOpenEmployers] = useState(false);
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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Личный кабинет юридического лица</h1>

                    {/* Данные пользователя */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Данные сотрудника</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">ФИО</span>
                                <span className="text-lg text-gray-800">{user.last_name} {user.first_name} {user.second_name}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">Роль</span>
                                <span className="text-lg text-gray-800">{user.role}</span>
                            </div>
                            {user.position && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="block text-sm font-medium text-gray-600 mb-1">Должность</span>
                                    <span className="text-lg text-gray-800">{user.position}</span>
                                </div>
                            )}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">Номер телефона</span>
                                <span className="text-lg text-gray-800">{user.phone}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-sm font-medium text-gray-600 mb-1">Электронная почта</span>
                                <span className="text-lg text-gray-800">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* Данные компании */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Данные компании</h2>
                        {isLoadingCompany ? (
                            <div className="text-gray-600 text-center py-8">Загрузка данных компании...</div>
                        ) : companyData ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="block text-sm font-medium text-gray-600 mb-1">Название компании</span>
                                    <span className="text-lg text-gray-800">{companyData.name}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="block text-sm font-medium text-gray-600 mb-1">ИНН</span>
                                    <span className="text-lg text-gray-800">{companyData.inn}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="block text-sm font-medium text-gray-600 mb-1">Количество сотрудников</span>
                                    <span className="text-lg text-gray-800">{companyData.employees_count}</span>
                                </div>
                                <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
                                    <span className="block text-sm font-medium text-gray-600 mb-2">Баланс компании</span>
                                    <span className="text-3xl font-bold text-pink-600">{companyData.balance} ₽</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-600 text-center py-8">Данные компании недоступны</div>
                        )}
                    </div>

                    {/* Токен приглашения - только для руководителя */}
                    {user.role === 'Руководитель' && companyData?.invite_token && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Токен приглашения</h2>
                            <p className="text-gray-600 mb-4">
                                Передайте этот токен сотрудникам для регистрации в компании
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                {showToken ? (
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <code className="bg-gray-200 px-4 py-2 rounded font-mono text-sm break-all">{companyData.invite_token}</code>
                                        <button
                                            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors duration-200"
                                            onClick={handleCopyToken}
                                        >
                                            {copiedToken ? '✓ Скопировано' : 'Копировать'}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
                                        onClick={() => setShowToken(true)}
                                    >
                                        Показать токен
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Балансы */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Отслеживание баланса</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
                                <span className="block text-sm font-medium text-gray-600 mb-2">Личный баланс</span>
                                <span className="text-3xl font-bold text-pink-600">{user.balance} ₽</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Раздел обращений компании */}
                <AppealsSection user={user} />

                {/* Управление сотрудниками - только для руководителя */}
                {user.role === 'Руководитель' && (
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <button
                            className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                            onClick={() => setIsOpenEmployers((prev) => !prev)}
                        >
                            <span className="text-lg font-medium text-gray-800">Список сотрудников</span>
                            <span className="text-gray-600">{isOpenEmployers ? '▲' : '▼'}</span>
                        </button>

                        {isOpenEmployers && (
                            <div className="mt-6">
                                {isLoadingEmployees ? (
                                    <div className="text-gray-600 text-center py-8">Загрузка списка сотрудников...</div>
                                ) : employeesData?.employees ? (
                                    <div>
                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold text-gray-800">Всего сотрудников: {employeesData.total_count}</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
                                            {employeesData.employees.map((employee) => (
                                                <div key={employee.id} className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="font-semibold text-gray-800 mb-2">
                                                        {employee.full_name}
                                                    </div>
                                                    <div className="space-y-1 mb-3">
                                                        <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">{employee.role}</span>
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
                )}
            </div>
        </div>
    );
};