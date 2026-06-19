import { NavLink } from "react-router-dom";
import { DIRECTOR_ROLE } from "@/features/profile/company/manage-employees/model/constants";

const navLinkClass = ({ isActive }) =>
  [
    "block rounded-xl px-4 py-3 text-sm font-medium transition",
    isActive
      ? "bg-primary text-on-primary"
      : "border border-border bg-background text-text hover:border-primary hover:text-primary",
  ].join(" ");

export const AccountNav = ({ user }) => {
  const isDirector = user?.role === DIRECTOR_ROLE;

  if (!isDirector) {
    return null;
  }

  return (
    <nav className="mt-4 space-y-2 border-t border-border pt-4">
      <NavLink to="/personal-account" end className={navLinkClass}>
        Обращения
      </NavLink>
      <NavLink to="/personal-account/company" className={navLinkClass}>
        Управление компанией
      </NavLink>
    </nav>
  );
};
