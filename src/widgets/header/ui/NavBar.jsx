import { NavLink } from 'react-router-dom';
import { useLogout } from '../../../entities/user/model/useLogout';
import { useUser } from '../../../entities/user/model/useUser';

const NavBar = () => {
    const { user } = useUser();
    const { logoutMutation } = useLogout()


    const handleLogout = (e) => {
        e.preventDefault();
        logoutMutation.mutate();
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
                {user ? "Личный кабинет" : "Авторизация"}
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
