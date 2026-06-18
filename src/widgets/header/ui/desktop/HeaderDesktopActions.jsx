import { HeaderAccountLink } from '../account/HeaderAccountLink';
import { HeaderBalance } from '../account/HeaderBalance';
import { HeaderLogoutButton } from '../account/HeaderLogoutButton';

export const HeaderDesktopActions = () => (
  <div className="hidden items-center gap-3 md:flex">
    <HeaderAccountLink />
    <HeaderBalance />
    <HeaderLogoutButton />
  </div>
);
