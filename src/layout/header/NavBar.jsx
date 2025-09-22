import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../../shared/api/auth/loginApi';
import { useUser } from '../../shared/hooks/useUser';

const NavBar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // useMutation для выхода пользователя
    const mutation = useMutation({
        mutationFn: logoutApi, // функция выхода
        onSuccess: () => {
            // после успешного логаута очищаем данные пользователя в React Query
            queryClient.setQueryData(['user'], null);
            queryClient.invalidateQueries(['user']); // принудительно обновляем запросы, если где-то ещё используется
            navigate('/auth/login'); // перенаправляем на страницу логина
        },
    });

    // получаем текущего пользователя
    const { user } = useUser();

    // обработчик кнопки выхода
    const handleLogout = (e) => {
        e.preventDefault();
        mutation.mutate(); // вызываем мутацию выхода
    };

    return (
        <nav className="flex items-center space-x-8">
            {/* Основные навигационные ссылки */}
            <NavLink
                to="/press-center"
                className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                Пресс-центр
            </NavLink>

            <NavLink
                to="/contacts"
                className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                Контакты
            </NavLink>

            {/* Ссылка на личный кабинет, зависит от авторизации */}
            <NavLink
                to={user ? "/personal-account" : "/auth/login"}
                className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                {user ? "Личный кабинет" : "Войти в кабинет"}
            </NavLink>

            {/* Кнопка выхода показывается только если пользователь авторизован */}
            {user && (
                <button
                    onClick={handleLogout}
                    className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
                >
                    Выйти
                </button>
            )}
        </nav>
    );
};

export default NavBar;
