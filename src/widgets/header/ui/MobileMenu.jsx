import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '@/entities/user/model/useUser';
import { useLogout } from '@/entities/user/model/useLogout';

const MobileMenu = ({ isOpen, onClose }) => {
    const { user } = useUser();
    const { logoutMutation } = useLogout();

    const navLinks = [
        { to: '/about', label: 'О нас' },
        { to: '/ServicesPrivate', label: 'Частным лицам' },
        { to: '/ServicesBusiness', label: 'Бизнесу' },
        { to: '/press-center', label: 'Статьи' },
        { to: '/contacts', label: 'Контакты' },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        logoutMutation.mutate();
    };

    // Блокируем скролл на body когда меню открыто
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }

        // Очистка при размонтировании
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div></div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
                        aria-label="Закрыть меню"
                    >
                        <div className="w-5 h-5 relative flex items-center justify-center">
                            <span className="block h-0.5 w-5 bg-gray-600 transform rotate-45 absolute"></span>
                            <span className="block h-0.5 w-5 bg-gray-600 transform -rotate-45 absolute"></span>
                        </div>
                    </button>
                </div>
                <div className="flex-1 py-6 px-6 flex flex-col justify-center items-center space-y-6">
                    {navLinks.map((link) => (
                        <div key={link.to} className="flex flex-col items-center space-y-2 w-full">
                            <NavLink
                                to={link.to}
                                onClick={onClose}
                                className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
                            >
                                {link.label}
                            </NavLink>
                            <div className="w-16 h-0.5 bg-red-500"></div>
                        </div>
                    ))}

                    <div className="flex flex-col items-center space-y-2 w-full">
                        <NavLink
                            to={user ? "/personal-account" : "/auth/login"}
                            onClick={onClose}
                            className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
                        >
                            {user ? "Личный кабинет" : "Авторизация"}
                        </NavLink>
                        <div className="w-16 h-0.5 bg-red-500"></div>
                    </div>

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="text-gray-900 hover:text-red-600 font-medium transition-colors duration-200 text-2xl"
                        >
                            Выйти
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;
