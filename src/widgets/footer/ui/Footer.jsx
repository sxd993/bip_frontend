import { Link } from "react-router-dom";
import { POLICY_LINKS } from "../model/const/policyLinks";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="mt-auto w-full pb-6">
    <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface px-4 py-6 sm:px-6">
        <nav
          aria-label="Правовая информация"
          className="grid grid-cols-1 gap-3 text-center sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-6 lg:gap-y-2"
        >
          {POLICY_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm leading-snug text-text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-4 text-center text-sm text-text-muted">
          © {CURRENT_YEAR} «Баукен и Партнеры». Все права защищены.
        </p>
      </div>
    </div>
  </footer>
);
