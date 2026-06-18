import { HeaderAccountLink } from "../account/HeaderAccountLink";
import { HeaderBalance } from "../account/HeaderBalance";
import { HeaderLogoutButton } from "../account/HeaderLogoutButton";

export const HeaderMobileMenu = ({ isOpen, onNavigate }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="header-mobile-menu" className="border-t border-border md:hidden">
      <nav
        aria-label="Мобильная навигация"
        className="flex flex-col items-center gap-2 px-4 py-4 sm:px-5 lg:px-6"
      >
        <div className="flex items-center gap-3">
          <HeaderAccountLink onNavigate={onNavigate} />
          <HeaderBalance />
        </div>
        <HeaderLogoutButton
          onNavigate={onNavigate}
          className="justify-center"
        />
      </nav>
    </div>
  );
};
