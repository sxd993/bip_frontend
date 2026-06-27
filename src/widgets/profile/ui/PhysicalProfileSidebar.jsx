import { ProfileSidebarField } from './ProfileSidebarField';
import { formatBalance } from '@/shared/utils/formatters';
import { AccountNav } from './AccountNav';

const getFullName = (user) =>
  [user?.last_name, user?.first_name, user?.second_name].filter(Boolean).join(' ');

export const PhysicalProfileSidebar = ({ user }) => {
  const fullName = getFullName(user);

  return (
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div>
        <p className="truncate text-sm font-semibold text-text sm:text-base">
          {fullName || 'Пользователь'}
        </p>
        <p className="text-[0.6875rem] font-semibold text-primary sm:text-xs">
          Частное лицо
        </p>
      </div>

      <dl className="mt-4 space-y-3 border-t border-border pt-4">
        <ProfileSidebarField label="Баланс" highlight>
          {formatBalance(user?.balance)}
        </ProfileSidebarField>
        <ProfileSidebarField label="Телефон">{user?.phone || '—'}</ProfileSidebarField>
        <ProfileSidebarField label="Email">{user?.email || '—'}</ProfileSidebarField>
      </dl>

      <AccountNav user={user} />
    </div>
  );
};
