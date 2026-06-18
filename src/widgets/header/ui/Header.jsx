import { Logo } from "@/shared/ui/logo/Logo";
import { useMobileMenu } from "../model/hooks/useMobileMenu";
import { HeaderDesktopActions } from "./desktop/HeaderDesktopActions";
import { HeaderMobileMenu } from "./mobile/HeaderMobileMenu";
import { HeaderMobileToggle } from "./mobile/HeaderMobileToggle";

export const Header = () => {
  const { isOpen, close, toggle } = useMobileMenu();

  return (
    <header className="sticky top-0 z-40 w-full pt-3">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="flex h-16 items-center justify-between px-4 sm:px-5 lg:px-6">
            <Logo accentBackground />

            <div className="flex items-center gap-3">
              <HeaderDesktopActions />
              <HeaderMobileToggle isOpen={isOpen} onToggle={toggle} />
            </div>
          </div>

          <HeaderMobileMenu isOpen={isOpen} onNavigate={close} />
        </div>
      </div>
    </header>
  );
};
