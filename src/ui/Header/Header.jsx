import NavBar from './NavBar';
import logo from '../../assets/logo.png';
import './styles/Header.css';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import shapka from '../../assets/shapka.svg';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcomeImage, setShowWelcomeImage] = useState(true);
  const location = useLocation();
  const headerRef = useRef(null);
  const hasLeftViewport = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  const handleSearch = () => {

  };

  return (
    <header className="header" ref={headerRef}>
      <div
        className={`header-container ${showWelcomeImage && location.pathname === '/' && !isMobile ? 'red-overlay' : ''
          }`}
      >
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo-image" />
          </NavLink>
        </div>
        <div className="search-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Опишите свою ситуацию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
          <label htmlFor="search" className="search-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 50 50"
              aria-hidden="true"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
            </svg>
          </label>
        </div>
        <div className="nav-container">
          <NavBar />
        </div>
      </div>
      {showWelcomeImage && location.pathname === '/' && (
        <div className='shapka-container'>
          <img src={shapka} alt="Welcome Banner" className="shapka-image" />
        </div>
      )}
    </header>
  );
};

export default Header;