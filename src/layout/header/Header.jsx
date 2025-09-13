import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerBgClass = 'bg-black/50 backdrop-blur-sm';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20 gap-6">
            {/* Логотип */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <img src='https://s3.twcstorage.ru/d90a9000-bip/logo/logo.avif' alt="Logo" className="h-12 w-auto" />
              </NavLink>
            </div>
            
            {/* Навигация - скрыта на мобильных, видна на md+ */}
            <div className="hidden md:flex items-center flex-1 justify-end">
              <NavBar />
            </div>
            
            {/* Кнопка мобильного меню - видна только на мобильных */}
            <MobileMenuButton isOpen={isMenuOpen} onToggle={toggleMobileMenu} />
          </div>
        </div>
      </header>
      
      {/* Мобильное меню - вынесено за пределы Header для независимости от прозрачности */}
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      />
      
    </>
  );
};

export default Header;