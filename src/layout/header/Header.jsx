import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [showWelcomeImage, setShowWelcomeImage] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);
  const hasLeftViewport = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !hasLeftViewport.current) {
          setShowWelcomeImage(false);
          hasLeftViewport.current = true;
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '0px',
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowWelcomeImage(true);
      hasLeftViewport.current = false;
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHome = location.pathname === '/';
  const headerBgClass = isHome && !isScrolled ? 'bg-transparent' : 'bg-black/50 backdrop-blur-sm';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`} ref={headerRef}>
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
      
      {showWelcomeImage && location.pathname === '/' && !isMobile && (
        <div className="relative h-screen bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
          <img src='https://s3.twcstorage.ru/d90a9000-bip/shapka/shapka.svg' alt="Welcome Banner" className="w-full h-full object-cover opacity-80" />
        </div>
      )}
    </>
  );
};

export default Header;