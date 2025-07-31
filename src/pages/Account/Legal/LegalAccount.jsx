import { useState } from 'react';
import './LegalAccount.css';
import { AddEmployee } from './Employers/AddEmployee';
import { Departament } from './Departament/Departament';

export const LegalAccount = ({ user }) => {
    const [isOpenDepartament, setIsOpenDepartament] = useState(false);
    const [isOpenEmployers, setIsOpenEmployers] = useState(false);

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
                            <span className="info-value"> {user.second_name} {user.first_name} {user.last_name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Должность</span>
                            <span className="info-value">{user.role}</span>
                        </div>
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
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Название компании</span>
                            <span className="info-value">{user.company?.name || 'Не указано'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">ИНН</span>
                            <span className="info-value">{user.company?.inn || 'Не указано'}</span>
                        </div>
                        {user.company && (
                            <div className="info-item balance-item">
                                <span className="info-label">Баланс компании</span>
                                <span className="info-value balance-amount">{user.company.balance} ₽</span>
                            </div>
                        )}
                    </div>
                </div>

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

                <div
                    className={`legal-action-btn${isOpenDepartament ? ' open' : ''}`}
                    onClick={() => setIsOpenDepartament((prev) => !prev)}
                >
                    <span>Управление отделами</span>
                    <span className="arrow">{isOpenDepartament ? '▲' : '▼'}</span>
                </div>
                {isOpenDepartament && user.role === 'Руководитель' && (
                    <Departament
                        isOpenDepartament={isOpenDepartament}
                        setIsOpenDepartament={setIsOpenDepartament}
                    />
                )}

                <div
                    className={`legal-action-btn${isOpenEmployers ? ' open' : ''}`}
                    onClick={() => setIsOpenEmployers((prev) => !prev)}
                >
                    <span>Управление сотрудниками</span>
                    <span className="arrow">{isOpenEmployers ? '▲' : '▼'}</span>
                </div>
                {isOpenEmployers && (user.role === 'Руководитель' || user.role === 'Руководитель отдела') && (
                    <AddEmployee
                        isOpenEmployers={isOpenEmployers}
                        setIsOpenEmployers={setIsOpenEmployers}
                        role={user.role}
                    />
                )}
            </div>
        </div>
    );
};