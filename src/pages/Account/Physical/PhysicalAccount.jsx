import './PhysicalAccount.css';
import { Transactions } from './Transactions';
import { Deals } from './Deals';

export const PhysicalAccount = ({ user }) => {
    return (
        <div className="physical-account">
            <div className="account-card">
                <h1 className="account-title">Личный кабинет физического лица</h1>

                <div className="section">
                    <h2>Персональные данные</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">ФИО</span>
                            <span className="info-value">{user.last_name} {user.first_name} {user.second_name}</span>
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

                <div className="section balance-section">
                    <h2>Управление балансом</h2>
                    <div className="info-grid">
                        <div className="info-item balance-item">
                            <span className="info-label">Текущий баланс</span>
                            <span className="info-value balance-amount">{user.balance} ₽</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Transactions/>
                    <Deals/>
                </div>
            </div>
        </div>
    );
};