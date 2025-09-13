import Register from '../features/auth/ui/Register';
import Login from '../features/auth/components/Login/Login';
import { useState, useEffect } from 'react';
import { useUser } from '../shared/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../shared/ui/Loading';

export const Auth = () => {
    const [currentStage, setCurrentStage] = useState("login");
    const { user, isLoading, error } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && user) {
            navigate('/personal-account', { replace: true });
        }
    }, [isLoading, user, navigate]);

    if (isLoading) return <Loading size="large" text="Проверка авторизации..." className="min-h-screen" />;

    // ошибка загрузки (кроме 401)  
    if (error) return <div>Ошибка загрузки данных</div>;

    // если пользователь не авторизован, показываем форму
    return (
        <div className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Авторизация</h1>
                    <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">Войдите в систему или создайте новый аккаунт</p>
                </div>
                
                <div className="max-w-2xl mx-auto">
                    {currentStage === 'login' ? (
                        <Login currentStage={currentStage} setCurrentStage={setCurrentStage} />
                    ) : (
                        <Register currentStage={currentStage} setCurrentStage={setCurrentStage} />
                    )}
                </div>
            </div>
        </div>
    );
};
