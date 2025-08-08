import { useState } from 'react';
import { PhysicalRegister } from '../../../components/Auth/Register/PhysicalRegister';
import { LegalRegister } from '../../../components/Auth/Register/LegalRegister';
import { EmployeeRegister } from '../../../components/Auth/Register/EmployeeRegister';
import './Register.css';

const Register = ({ currentStage, setCurrentStage }) => {
    const [userType, setUserType] = useState('physical');
    const [legalType, setLegalType] = useState('director');

    return (
        <div className="register-content">
            <div className="form-container">
                <h3>Регистрация</h3>
                <div className="user-type-toggle">
                    <button
                        type="button"
                        className={userType === 'physical' ? 'user-type-btn active' : 'user-type-btn'}
                        onClick={() => setUserType('physical')}
                    >
                        Физ. лицо
                    </button>
                    <button
                        type="button"
                        className={userType === 'legal' ? 'user-type-btn active' : 'user-type-btn'}
                        onClick={() => setUserType('legal')}
                    >
                        Юр. лицо
                    </button>
                </div>

                {/* Если выбрано юр. лицо, показываем дополнительный выбор */}
                {userType === 'legal' && (
                    <div className="legal-type-toggle">
                        <button
                            type="button"
                            className={legalType === 'director' ? 'legal-type-btn active' : 'legal-type-btn'}
                            onClick={() => setLegalType('director')}
                        >
                            Руководитель компании
                        </button>
                        <button
                            type="button"
                            className={legalType === 'employee' ? 'legal-type-btn active' : 'legal-type-btn'}
                            onClick={() => setLegalType('employee')}
                        >
                            Сотрудник компании
                        </button>
                    </div>
                )}

                {/* Отображаем нужную форму */}
                {userType === 'physical' && <PhysicalRegister />}
                {userType === 'legal' && legalType === 'director' && <LegalRegister />}
                {userType === 'legal' && legalType === 'employee' && <EmployeeRegister />}

                <div
                    onClick={() => setCurrentStage('login')}
                    className="switch-auth-button"
                    style={{ cursor: 'pointer' }}
                >
                    Уже есть аккаунт? Войти
                </div>
            </div>
        </div>
    );
};

export default Register;