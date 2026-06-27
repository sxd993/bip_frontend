import { AccountLayout } from '@/widgets/profile/ui/AccountLayout';
import { PhysicalProfileSidebar } from '@/widgets/profile/ui/PhysicalProfileSidebar';
import { CompanyProfileSidebar } from '@/widgets/profile/ui/CompanyProfileSidebar';
import AppealsSection from '@/features/deal/view-appeals/ui/AppealsSection';
import { getGreetingName } from '@/widgets/profile/lib/getGreetingName';

export const CompletedAccount = ({ user }) => {
  const isLegal = user?.user_type === 'legal';
  const sidebar = isLegal ? (
    <CompanyProfileSidebar user={user} />
  ) : (
    <PhysicalProfileSidebar user={user} />
  );

  return (
    <AccountLayout
      title={`Здравствуйте, ${getGreetingName(user)}`}
      subtitle="Здесь отображаются обращения, закрытые юристом"
      sidebar={sidebar}
    >
      <AppealsSection variant="completed" />
    </AccountLayout>
  );
};
