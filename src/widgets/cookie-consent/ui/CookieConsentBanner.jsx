import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { useCookieConsent } from "../model/hooks/useCookieConsent";

const COOKIE_POLICY_LINK = "/#";

export const CookieConsentBanner = () => {
  const { isVisible, accept } = useCookieConsent();

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 pb-6"
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на использование cookie"
    >
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
          <p className="text-sm leading-relaxed text-text-muted">
            Мы используем cookie для работы сайта и авторизации. Продолжая
            пользоваться сервисом, вы соглашаетесь с{" "}
            <Link
              to={COOKIE_POLICY_LINK}
              className="text-primary transition-colors hover:text-primary-hover"
            >
              политикой использования cookie
            </Link>
            .
          </p>

          <Button
            type="button"
            onClick={accept}
            className="w-full shrink-0 sm:w-auto"
          >
            Понятно
          </Button>
        </div>
      </div>
    </div>
  );
};
