import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import AppealsSection from '../../../view-appeals/ui/AppealsSection';
import { EditEmployeeDataModal } from './EditEmployeeDataModal';
import InviteEmployeeModal from '../../../invite-employee/ui/InviteEmployeeModal';
import PendingInvitesModal from '../../../invite-employee/ui/PendingInvitesModal';
import RemoveEmployeeModal from '../../../remove-employee/ui/RemoveEmployeeModal';
import { useRemoveEmployee } from '../../../remove-employee/model/useRemoveEmployee';

const VALID_SECTIONS = ['employee', 'appeals', 'company', 'employees'];
const DEFAULT_SECTION = 'appeals';

export const LegalAccount = ({ user, companyData, employeesData, isLoadingCompany, isLoadingEmployees }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const [isPendingInvitesModalOpen, setPendingInvitesModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const queryClient = useQueryClient();

    const deleteEmployeeMutation = useRemoveEmployee({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companyEmployees'] });
            setEmployeeToDelete(null);
        },
    });

    const deleteEmployeeError =
        deleteEmployeeMutation.error?.response?.data?.error ||
        deleteEmployeeMutation.error?.message;

    const handleConfirmDelete = () => {
        if (!employeeToDelete) return;
        deleteEmployeeMutation.mutate(employeeToDelete.id);
    };

    const handleCloseDeleteModal = () => {
        if (deleteEmployeeMutation.isPending) return;
        deleteEmployeeMutation.reset();
        setEmployeeToDelete(null);
    };

    // Получаем активную вкладку из URL параметра
    const params = new URLSearchParams(location.search);
    let activeSection = params.get('tab') || DEFAULT_SECTION;

    // Валидация: если параметр невалидный или 'employees' но юзер не руководитель - используем дефолтный
    if (!VALID_SECTIONS.includes(activeSection)) {
        activeSection = DEFAULT_SECTION;
    }
    if (activeSection === 'employees' && user.role !== 'Руководитель') {
        activeSection = DEFAULT_SECTION;
    }

    // Меняем вкладку через URL
    const handleTabChange = (tabName) => {
        navigate(`/personal-account?tab=${tabName}`);
    };

    return (
        <>
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
                            className={`flex-1 px-3 py-3 font-medium text-sm transition-colors duration-200 ${activeSection === 'employee'
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => handleTabChange('employee')}
                        >
                            Сотрудник
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-3 py-3 font-medium text-sm transition-colors duration-200 ${activeSection === 'appeals'
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => handleTabChange('appeals')}
                        >
                            Обращения
                        </button>
                        <button
                            type="button"
                            className={`flex-1 px-3 py-3 font-medium text-sm transition-colors duration-200 ${activeSection === 'company'
                                ? 'bg-red-500 text-white'
                                : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                }`}
                            onClick={() => handleTabChange('company')}
                        >
                            Компания
                        </button>
                        {user.role === 'Руководитель' && (
                            <button
                                type="button"
                                className={`flex-1 px-3 py-3 font-medium text-sm transition-colors duration-200 ${activeSection === 'employees'
                                    ? 'bg-red-500 text-white'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-red-50'
                                    }`}
                                onClick={() => handleTabChange('employees')}
                            >
                                Управление
                            </button>
                        )}
                    </div>

                    {/* Содержимое вкладок */}
                    <div className="p-8 md:p-12">
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
                                <AppealsSection />
                            </div>
                        )}

                        {activeSection === 'company' && (
                            <div>
                                <div className="flex justify-between items-center mb-8">
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

                                {user.role === 'Руководитель' && (
                                    <div className="mt-8">
                                        <div className="bg-white border-2 border-red-200 rounded-3xl p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">Приглашение сотрудников</h3>
                                            <p className="text-gray-600 text-center">
                                                Приглашайте сотрудников по электронной почте. Каждому приглашённому отправляется уникальная одноразовая ссылка для регистрации.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setInviteModalOpen(true)}
                                                    className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl font-bold transition-colors duration-200"
                                                >
                                                    Пригласить сотрудника
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPendingInvitesModalOpen(true)}
                                                    className="w-full sm:w-auto px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
                                                >
                                                    Отправленные приглашения
                                                </button>
                                            </div>
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
                                ) : employeesData?.employees?.length > 0 ? (
                                    <div>
                                        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            <div>
                                                <h4 className="text-lg font-medium text-gray-700">Всего сотрудников: {employeesData.total_count}</h4>
                                                <p className="text-sm text-gray-500 mt-1">Пригласите новых сотрудников по email, чтобы они получили персональную ссылку.</p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setInviteModalOpen(true)}
                                                    className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl font-bold transition-colors duration-200"
                                                >
                                                    Пригласить сотрудника
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPendingInvitesModalOpen(true)}
                                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-700 rounded-3xl hover:border-gray-300 transition-colors duration-200 font-medium"
                                                >
                                                    Отправленные приглашения
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {employeesData.employees.map((employee) => (
                                                <div key={employee.id} className="relative bg-red-50 p-4 rounded-2xl border-2 border-red-200">
                                                    {employee.role !== 'Руководитель' && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setEmployeeToDelete(employee)}
                                                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                                            aria-label={`Удалить сотрудника ${employee.full_name}`}
                                                        >
                                                            ×
                                                        </button>
                                                    )}
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
                                    <div className="text-gray-600 text-center py-8 space-y-6">
                                        <p>Нет сотрудников</p>
                                        <button
                                            type="button"
                                            onClick={() => setInviteModalOpen(true)}
                                            className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-3xl font-bold transition-colors duration-200"
                                        >
                                            Пригласить первого сотрудника
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditEmployeeDataModal 
                isOpen={isEditEmployeeModalOpen}
                onClose={() => setIsEditEmployeeModalOpen(false)}
                user={user}
            />
        </div>
        <InviteEmployeeModal
            isOpen={isInviteModalOpen}
            onClose={() => setInviteModalOpen(false)}
            onInviteSent={() => {
                queryClient.invalidateQueries({ queryKey: ['companyInvites'] });
            }}
        />
        <PendingInvitesModal
            isOpen={isPendingInvitesModalOpen}
            onClose={() => setPendingInvitesModalOpen(false)}
        />
        <RemoveEmployeeModal
            isOpen={Boolean(employeeToDelete)}
            employee={employeeToDelete}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            isLoading={deleteEmployeeMutation.isPending}
            errorMessage={deleteEmployeeError}
        />
        </>
    );
};
