import { useState } from 'react';
import './LegalAccount.css';
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
        <div className="legal-account">
            <div className="account-card">
                <h1 className="account-title">Личный кабинет юридического лица</h1>

                {/* Данные пользователя */}
                <div className="section">
                    <h2>Данные сотрудника</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">ФИО</span>
                            <span className="info-value">{user.last_name} {user.first_name} {user.second_name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Роль</span>
                            <span className="info-value">{user.role}</span>
                        </div>
                        {user.position && (
                            <div className="info-item">
                                <span className="info-label">Должность</span>
                                <span className="info-value">{user.position}</span>
                            </div>
                        )}
                        <div className="info-item">
                            <span className="info-label">Номер телефона</span>
                            <span className="info-value">{user.phone}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Электронная почта</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Данные компании */}
                <div className="section company-section">
                    <h2>Данные компании</h2>
                    {isLoadingCompany ? (
                        <div>Загрузка данных компании...</div>
                    ) : companyData ? (
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Название компании</span>
                                <span className="info-value">{companyData.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">ИНН</span>
                                <span className="info-value">{companyData.inn}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Количество сотрудников</span>
                                <span className="info-value">{companyData.employees_count}</span>
                            </div>
                            <div className="info-item balance-item">
                                <span className="info-label">Баланс компании</span>
                                <span className="info-value balance-amount">{companyData.balance} ₽</span>
                            </div>
                        </div>
                    ) : (
                        <div>Данные компании недоступны</div>
                    )}
                </div>

                {/* Токен приглашения - только для руководителя */}
                {user.role === 'Руководитель' && companyData?.invite_token && (
                    <div className="section token-section">
                        <h2>Токен приглашения</h2>
                        <p className="token-description">
                            Передайте этот токен сотрудникам для регистрации в компании
                        </p>
                        <div className="token-container">
                            {showToken ? (
                                <div className="token-display">
                                    <code className="token-code">{companyData.invite_token}</code>
                                    <button
                                        className="copy-token-btn"
                                        onClick={handleCopyToken}
                                    >
                                        {copiedToken ? '✓ Скопировано' : 'Копировать'}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="show-token-btn"
                                    onClick={() => setShowToken(true)}
                                >
                                    Показать токен
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Балансы */}
                <div className="section balance-section">
                    <h2>Отслеживание баланса</h2>
                    <div className="info-grid">
                        <div className="info-item balance-item">
                            <span className="info-label">Личный баланс</span>
                            <span className="info-value balance-amount">{user.balance} ₽</span>
                        </div>
                    </div>
                </div>

                {/* Раздел обращений компании */}
                <AppealsSection user={user} />

                {/* Управление сотрудниками - только для руководителя */}
                {user.role === 'Руководитель' && (
                    <>
                        <div
                            className={`legal-action-btn${isOpenEmployers ? ' open' : ''}`}
                            onClick={() => setIsOpenEmployers((prev) => !prev)}
                        >
                            <span>Список сотрудников</span>
                            <span className="arrow">{isOpenEmployers ? '▲' : '▼'}</span>
                        </div>

                        {isOpenEmployers && (
                            <div className="employees-section">
                                {isLoadingEmployees ? (
                                    <div>Загрузка списка сотрудников...</div>
                                ) : employeesData?.employees ? (
                                    <div className="employees-list">
                                        <div className="employees-header">
                                            <h3>Всего сотрудников: {employeesData.total_count}</h3>
                                        </div>
                                        <div className="employees-grid">
                                            {employeesData.employees.map((employee) => (
                                                <div key={employee.id} className="employee-card">
                                                    <div className="employee-name">
                                                        {employee.full_name}
                                                    </div>
                                                    <div className="employee-info">
                                                        <span className="employee-role">{employee.role}</span>
                                                        {employee.position && (
                                                            <span className="employee-position">{employee.position}</span>
                                                        )}
                                                    </div>
                                                    <div className="employee-contacts">
                                                        <div>{employee.phone}</div>
                                                        <div>{employee.email}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>Нет сотрудников</div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};