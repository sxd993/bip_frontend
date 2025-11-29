import '../style.css';

export const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="welcome-banner__image-wrapper">
        <img
          className="welcome-banner__img"
          src="https://s3.twcstorage.ru/d90a9000-bip/home-page/Group%201870.jpg"
          alt="Широкий спектр услуг"
        />
        <div className="welcome-banner__overlay" />
        <div className="welcome-banner__text">
          Широкий спектр услуг
          <br />
          для любого случая
        </div>
      </div>
    </div>
  );
};
