import { Loading } from "@/shared/ui/Loading";
import AppealsSection from "@/features/deal/view-appeals/ui/AppealsSection";
import { AccountLayout } from "@/widgets/profile/ui/AccountLayout";
import { PhysicalProfileSidebar } from "@/widgets/profile/ui/PhysicalProfileSidebar";

import { getGreetingName } from '@/widgets/profile/lib/getGreetingName';

export const PhysicalAccount = ({ user, isLoading }) => {
  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <AccountLayout
      title={`Здравствуйте, ${getGreetingName(user)}`}
      subtitle="Здесь вы видите все обращения и можете создать новое"
      sidebar={<PhysicalProfileSidebar user={user} />}
    >
      <AppealsSection />
    </AccountLayout>
  );
};
