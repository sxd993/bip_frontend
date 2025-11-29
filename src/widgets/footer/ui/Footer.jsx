import { NavLink } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0">
          <div className="text-center md:flex-1 md:text-center">
            <h4 className="text-lg font-semibold mb-4 text-white">КОМПАНИЯ</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  О компании
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth/register" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Регистрация
                </NavLink>
              </li>
              <li>
                <NavLink to="/contacts" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Контакты
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="text-center md:flex-1 md:text-center">
            <h4 className="text-lg font-semibold mb-4 text-white">СЕРВИСЫ</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/calculator" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Онлайн-калькулятор
                </NavLink>
              </li>
              <li>
                <NavLink to="/certificate-verification" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Проверка сертификатов
                </NavLink>
              </li>
              <li>
                <NavLink to="/certification-of-evidence" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Фиксация доказательств
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:flex-1 md:text-center">
            <h4 className="text-lg font-semibold mb-4 text-white">ПРЕСС-ЦЕНТР</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/press-center/news" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Новости
                </NavLink>
              </li>
              <li>
                <NavLink to="/press-center/publications" className="text-slate-300 hover:text-red-400 transition-colors duration-200">
                  Публикации
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-600 mt-8 pt-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-0">
            <Copyright />
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
