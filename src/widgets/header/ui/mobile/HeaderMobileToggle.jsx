import { CloseIcon } from "@/shared/ui/icons/header/CloseIcon";
import { MenuIcon } from "@/shared/ui/icons/header/MenuIcon";

export const HeaderMobileToggle = ({ isOpen, onToggle }) => (
  <button
    type="button"
    aria-expanded={isOpen}
    aria-controls="header-mobile-menu"
    aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
    onClick={onToggle}
    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text transition-colors hover:bg-surface-muted md:hidden"
  >
    {isOpen ? (
      <CloseIcon className="h-5 w-5" />
    ) : (
      <MenuIcon className="h-5 w-5" />
    )}
  </button>
);
