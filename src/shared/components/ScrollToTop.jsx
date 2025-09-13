import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Компонент для автоматического скролла наверх при смене страницы
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Мгновенный переход наверх при изменении пути
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Компонент не рендерит ничего видимого
};

export default ScrollToTop;
