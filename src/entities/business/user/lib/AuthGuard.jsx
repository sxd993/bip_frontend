import { useUser } from '@/entities/business/user/model/useUser';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../../../../shared/ui/Loading';

export const AuthGuard = ({ children }) => {
    const { user, isLoading, error } = useUser();
    const location = useLocation();

    // Показываем загрузку пока проверяем авторизацию
    if (isLoading) {
        return <Loading />;
    }

    // Если ошибка или нет пользователя - редирект на логин
    if (error || !user) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Пользователь авторизован - показываем контент
    return children;
};