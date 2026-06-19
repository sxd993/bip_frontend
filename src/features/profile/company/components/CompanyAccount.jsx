import { Loading } from "@/shared/ui/Loading";
import AppealsSection from "@/features/deal/view-appeals/ui/AppealsSection";
import { AccountLayout } from "@/widgets/profile/ui/AccountLayout";
import { CompanyProfileSidebar } from "@/widgets/profile/ui/CompanyProfileSidebar";

import { getGreetingName } from "@/widgets/profile/lib/getGreetingName";

export const CompanyAccount = ({ user, isLoading: userLoading }) => {
  if (userLoading) {
    return <Loading fullScreen />;
  }

  return (
    <AccountLayout
      title={`Здравствуйте, ${getGreetingName(user)}`}
      subtitle="Здесь вы видите все обращения компании и можете создать новое"
      sidebar={<CompanyProfileSidebar user={user} />}
    >
      <AppealsSection />
    </AccountLayout>
  );
};
