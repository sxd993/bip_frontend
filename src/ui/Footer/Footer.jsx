import { NavLink } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import './styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h4>КОМПАНИЯ</h4>
          <ul>
            <li>
              <NavLink to="/about">
                О компании
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/register">
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews">
                Отзывы
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts">
                Контакты
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>СЕРВИСЫ</h4>
          <ul>
            <li>
              <NavLink to="/calculator">
                Онлайн-калькулятор
              </NavLink>
            </li>
            <li>
              <NavLink to="/certificate-verification">
                Проверка сертификатов соответствия
              </NavLink>
            </li>
            <li>
              <NavLink to="/certification-of-evidence">
                Фиксация доказательства
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>ПРЕСС-ЦЕНТР</h4>
          <ul>
            <li>
              <NavLink to="/press-center/news">
                Новости
              </NavLink>
            </li>
            <li>
              <NavLink to="/press-center/publications">
                Публикации
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-links-container">
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
