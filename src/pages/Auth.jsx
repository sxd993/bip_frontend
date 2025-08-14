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

    if (isLoading) return <Loading />;

    // ошибка загрузки (кроме 401)  
    if (error) return <div>Ошибка загрузки данных</div>;

    // если пользователь не авторизован, показываем форму
    return (
        <div>
            {currentStage === 'login' ? (
                <Login currentStage={currentStage} setCurrentStage={setCurrentStage} />
            ) : (
                <Register currentStage={currentStage} setCurrentStage={setCurrentStage} />
            )}
        </div>
    );
};
