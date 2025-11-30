import { NavLink } from 'react-router-dom';
import '../style.css';

export const BusinessBanner = () => {
    return (
        <div className="welcome-banner bg-secondary rounded-[9px]">
            <div className="welcome-banner__image-wrapper">
                <img
                    className="welcome-banner__img"
                    src="https://s3.twcstorage.ru/d90a9000-bip/home-page/Group%202006.png"
                    alt="Широкий спектр услуг"
                />
                <div className="welcome-banner__overlay" />
                <div className="welcome-banner__text physical-banner__content">
                    <ul className="banner-list">
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Сопровождение сделок</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Земельные вопросы</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Трудовое право</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Вопросы в сфере интеллектуальной собственности</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Взыскание дебиторской задолженности</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>и многое другое</span>
                        </li>
                    </ul>

                    <NavLink
                        to={'/ServicesBusiness'}
                        className="banner-cta"
                    >
                        бизнесу
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
