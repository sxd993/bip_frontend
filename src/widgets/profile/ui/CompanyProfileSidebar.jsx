import { ProfileSidebarField } from "./ProfileSidebarField";
import { formatBalance } from "@/shared/utils/formatters";
import { AccountNav } from "./AccountNav";
import { DIRECTOR_ROLE } from "@/features/profile/company/manage-employees/model/constants";

export const CompanyProfileSidebar = ({ user }) => {
  const company = user?.company;
  const companyName = company?.name || "Компания";

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
          {companyName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-text sm:text-base">
            {companyName}
          </p>
          <p
            className={[
              "text-[0.6875rem] sm:text-xs",
              user?.role === DIRECTOR_ROLE
                ? "font-semibold text-primary"
                : "text-text-muted",
            ].join(" ")}
          >
            {user?.role || "Сотрудник"}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-3 border-t border-border pt-4">
        <ProfileSidebarField label="Баланс" highlight>
          {formatBalance(user?.balance)}
        </ProfileSidebarField>
        <ProfileSidebarField label="ИНН">
          {company?.inn || "—"}
        </ProfileSidebarField>
        <ProfileSidebarField label="Телефон">
          {company?.phone || "—"}
        </ProfileSidebarField>
        <ProfileSidebarField label="Email">
          {company?.email || "—"}
        </ProfileSidebarField>
      </dl>

      <AccountNav user={user} />
    </div>
  );
};
