import '../style.css';

export const PhysicalBanner = () => {
    return (
        <div className="welcome-banner bg-secondary rounded-[9px]">
            <div className="welcome-banner__image-wrapper">
                <img
                    className="welcome-banner__img translate-y-50"
                    src="https://s3.twcstorage.ru/d90a9000-bip/home-page/Group%202005.png"
                    alt="Широкий спектр услуг"
                />
                <div className="welcome-banner__overlay" />
                <div className="welcome-banner__text physical-banner__content">
                    <ul className="banner-list">
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Защита прав потребителей</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Семейные споры</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Ущерб</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Проблемы с земельными участками</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow">→</span>
                            <span>Споры с работодателем</span>
                        </li>
                        <li className="banner-list__item">
                            <span className="banner-list__arrow"></span>
                            <span>и другое</span>
                        </li>
                    </ul>

                    <button className="banner-cta">частным лицам</button>
                </div>
            </div>
        </div>
    )
}
