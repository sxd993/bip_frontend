import './styles/NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../../features/auth/api/loginApi';
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
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/press-center" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Пресс-центр
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contacts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Контакты
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/personal-account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Личный кабинет
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <a href="#" onClick={handleLogout}>Выйти</a>
                    </li>
                )}

            </ul>
        </nav>
    );
};

export default NavBar;