import { useState } from 'react';
import { PhysicalRegister } from './Physical';
import { LegalRegister } from './Legal';
import './Register.css';

const Register = ({ currentStage, setCurrentStage }) => {
    const [userType, setUserType] = useState('physical');

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
                
                {userType === 'physical' ? <PhysicalRegister /> : <LegalRegister />}
                
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