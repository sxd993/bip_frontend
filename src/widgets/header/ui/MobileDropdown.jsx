import { NavLink } from "react-router-dom";
import { SearchIcon } from "@/shared/ui/icons/SearchIcon";
import { SearchBar } from "./SearchBar";
import { useAuthActions } from "../hooks/useAuthActions";

export const MobileDropdown = () => {
  const { user, handleLogout } = useAuthActions()
  return (
    <div className="lg:hidden px-4 pb-4 bg-primary">
      <div className="flex flex-wrap items-center justify-center gap-3 px-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-[6px] flex-1 min-w-[180px] max-w-[360px]">
          <SearchIcon />
          <SearchBar />
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className="py-1 px-5 bg-white border-2 border-white rounded-[6px] text-black font-bold text-[18px] flex items-center justify-center flex-none">
            выйти
          </button>
        ) : (
          <NavLink
            to={'/auth/register'}
            className="py-1 px-5 bg-white border-2 border-white rounded-[6px] text-black font-bold text-[18px] flex items-center justify-center flex-none">
            зарегистрироваться
          </NavLink>
        )}
      </div>

      <nav className="flex flex-row gap-2 mt-3 justify-around xs:hidden">
        <NavLink
          to="/about"
          className="text-white text-[16px] sm:text-[18px] font-bold">
          о нас
        </NavLink>
        <NavLink
          to="/press-center"
          className="text-white text-[16px] sm:text-[18px] font-bold">
          статьи
        </NavLink>
      </nav>
    </div>
  );
}
