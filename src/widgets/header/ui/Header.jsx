import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {
  const headerBgClass = 'bg-black/50 backdrop-blur-sm';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20 gap-6">
            {/* Логотип */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <img src='https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg' alt="Logo" className="h-12 w-auto" />
              </NavLink>
            </div>
            
            {/* Навигация - скрыта на мобильных, видна на md+ */}
            <div className="hidden md:flex items-center flex-1 justify-end">
              <NavBar />
            </div>
          </div>
        </div>
      </header>
      
      
    </>
  );
};

export default Header;