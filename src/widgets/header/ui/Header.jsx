import { SearchIcon } from "@/shared/ui/icons/SearchIcon";
import { SearchBar } from "./SearchBar";
import { BurgerButton } from "@/shared/ui/icons/BurgerButton";
import { NavLink, useLocation } from "react-router-dom";
import { useHeader } from "../hooks/useHeader";
import { MobileDropdown } from "./MobileDropdown";

export const Header = () => {
  const { isMenuOpen, toggleMobileMenu } = useHeader()
  const { pathname } = useLocation()
  const isServicesPageOpen = pathname.includes('/Services')

  return (
    <header className={`
      px-[3%]
      ${isServicesPageOpen
        ? 'absolute top-0 left-0 w-full z-50 py-3 lg:py-4'
        : 'mt-[20px] lg:mt-[30px]'}
    `}>
      <div className="lg:max-w-[1180px] bg-primary rounded-[7px] mx-auto">

        {/* ===== MOBILE <430px ===== */}
        <div className="flex items-center justify-between gap-2 px-2 py-3 xs:hidden lg:hidden h-full">
          <NavLink
            to={'/'}
            className="relative overflow-hidden h-[40px] w-[140px] shrink-0 max-[390px]:w-[120px]">
            <img
              src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
              className="h-full w-full object-contain"
            />
          </NavLink>
          <div className="flex items-center gap-2 shrink-0">
            <NavLink
              to="/auth/login"
              className="text-[14px] px-3 py-1 border border-white rounded-[6px] text-white font-bold max-[390px]:px-2">
              войти
            </NavLink>
            <BurgerButton onClick={toggleMobileMenu} />
          </div>
        </div>

        {/* ===== TABLET 610px - 1024 */}
        <div className="hidden xs:flex lg:hidden items-center gap-6 px-4 py-3 justify-between">
          <NavLink
            to={'/'}
            className="relative w-[200px] overflow-hidden">
            <img
              src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
              className=" object-cover max-w-[90%]"
            />
          </NavLink>

          {/* Навигация */}
          <nav className="flex items-center gap-5">
            <NavLink
              to="/about"
              className="text-white text-[16px] sm:text-[18px] font-bold text-nowrap">
              о нас
            </NavLink>
            <NavLink
              to="/press-center"
              className="text-white text-[16px] sm:text-[18px] font-bold text-nowrap">
              статьи
            </NavLink>
          </nav>

          {/* Правый блок */}
          <div className="flex items-center gap-5">
            <NavLink
              to="/auth/login"
              className="text-white text-[16px] sm:text-[18px] font-bold border border-white px-5 py-[6px] rounded-[6px]">
              войти
            </NavLink>
            <BurgerButton onClick={toggleMobileMenu} className="scale-110" />
          </div>
        </div>

        {/* ===== MOBILE / TABLET DROPDOWN ===== */}
        {isMenuOpen && (
          <MobileDropdown />
        )}

        {/* ===== DESKTOP ===== */}
        <div className="hidden lg:flex items-center justify-around px-6 py-[11px] z-10">
          <div>
            <NavLink
              to={'/'}
              className="relative w-[200px] overflow-hidden">
              <img
                src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
                className=" object-cover max-w-[90%]"
              />
            </NavLink>
          </div>

          <div className="flex items-center mr-[10px] max-w-[519px] min-h-[42px] rounded-[6px] bg-white text-primary">
            <div className="flex justify-between px-4 gap-8">
              <NavLink to="/about" className="text-[18px] font-bold whitespace-nowrap">о нас</NavLink>
              <NavLink to="/press-center" className="text-[18px] font-bold whitespace-nowrap">статьи</NavLink>
            </div>

            <div className="max-w-[318px] h-8 border border-[#A01E1E] rounded-[7px] items-center lg:flex px-2 py-[5px] gap-2 mr-[5px] hidden">
              <SearchIcon />
              <SearchBar />
            </div>
          </div>

          <div className="flex gap-[13px]">
            <NavLink
              to={'/auth/login'}
              className="h-[42px] px-5 bg-primary border-2 border-white rounded-[6px] text-white font-bold text-[18px] flex items-center">
              войти
            </NavLink>
            <NavLink
              to={'/auth/register'}
              className="h-[42px] px-5 bg-white border-2 border-white rounded-[6px] text-black font-bold text-[18px] flex items-center">
              зарегистрироваться
            </NavLink>
          </div>
        </div>
      </div>
    </header >
  );
};
