import { ProfileSidebarField } from './ProfileSidebarField';
import { formatBalance } from '@/shared/utils/formatters';

const getInitials = (user) => {
  const first = user?.first_name?.[0] ?? '';
  const last = user?.last_name?.[0] ?? '';
  return `${first}${last}`.toUpperCase() || '?';
};

const getFullName = (user) =>
  [user?.last_name, user?.first_name, user?.second_name].filter(Boolean).join(' ');

export const PhysicalProfileSidebar = ({ user }) => {
  const fullName = getFullName(user);

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
          {getInitials(user)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text sm:text-base">
            {fullName || 'Пользователь'}
          </p>
          <p className="text-[0.6875rem] text-text-muted sm:text-xs">Частное лицо</p>
        </div>
      </div>

      <dl className="mt-4 space-y-3 border-t border-border pt-4">
        <ProfileSidebarField label="Баланс" highlight>
          {formatBalance(user?.balance)}
        </ProfileSidebarField>
        <ProfileSidebarField label="Телефон">{user?.phone || '—'}</ProfileSidebarField>
        <ProfileSidebarField label="Email">{user?.email || '—'}</ProfileSidebarField>
      </dl>
    </div>
  );
};
