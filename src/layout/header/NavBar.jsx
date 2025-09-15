import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../../shared/api/auth/loginApi';
import { useUser } from '../../shared/hooks/useUser';

const NavBar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.invalidateQueries(['user']);
            navigate('/auth/login');
        },
    });
    const { user } = useUser();
    const handleLogout = (e) => {
        e.preventDefault();
        mutation.mutate();
    };
    
    return (
        <nav className="flex items-center space-x-8">
            <NavLink 
                to="/press-center" 
                className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                Пресс-центр
            </NavLink>
            <NavLink 
                to="/contacts" 
                className="text-white ransition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                Контакты
            </NavLink>
            <NavLink 
                to="/personal-account" 
                className="text-white transition-colors duration-200 font-medium text-lg px-4 py-2 border border-transparent rounded-xl hover:border-red-400"
            >
                Личный кабинет
            </NavLink>
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