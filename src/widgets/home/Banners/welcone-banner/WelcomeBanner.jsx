import "../../style.css";

export const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="welcome-banner__image-wrapper !pt-[100%] sm:!pt-[50%] lg:!pt-[100%]">
        <img
          className="welcome-banner__img"
          src="https://s3.twcstorage.ru/1718254b-3e5a-4845-8527-e67480872a8b/center.png"
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
