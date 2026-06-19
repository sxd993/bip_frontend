import { ProfileSidebarField } from "./ProfileSidebarField";
import { formatBalance } from "@/shared/utils/formatters";

const getFullName = (user) =>
  [user?.last_name, user?.first_name, user?.second_name]
    .filter(Boolean)
    .join(" ");

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
          <p className="text-[0.6875rem] text-text-muted sm:text-xs">Юридическое лицо</p>
        </div>
      </div>

      <dl className="mt-4 space-y-3 border-t border-border pt-4">
        <ProfileSidebarField label="ИНН">
          {company?.inn || "—"}
        </ProfileSidebarField>
        <ProfileSidebarField label="Баланс" highlight>
          {formatBalance(user?.balance)}
        </ProfileSidebarField>
        <ProfileSidebarField label="Телефон">
          {company?.phone || "—"}
        </ProfileSidebarField>
        <ProfileSidebarField label="Email">
          {company?.email || "—"}
        </ProfileSidebarField>
      </dl>

      {user && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-text-muted sm:text-xs">
            Руководитель
          </p>
          <dl className="space-y-3 mt-2">
            <ProfileSidebarField label="ФИО">
              {getFullName(user) || "—"}
            </ProfileSidebarField>
          </dl>
        </div>
      )}
    </div>
  );
};
