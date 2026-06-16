import { Link } from "react-router-dom";
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
        <Link
          to="/ai-chat"
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-[#1e3a5f] font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg hover:bg-[#1e3a5f] hover:text-white transition-colors duration-200 whitespace-nowrap z-10"
        >
          Онлайн консультация
        </Link>
      </div>
    </div>
  );
};
