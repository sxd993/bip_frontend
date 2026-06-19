import { Loading } from "@/shared/ui/Loading";
import AppealsSection from "@/features/deal/view-appeals/ui/AppealsSection";
import { AccountLayout } from "@/widgets/profile/ui/AccountLayout";
import { CompanyProfileSidebar } from "@/widgets/profile/ui/CompanyProfileSidebar";

import { DIRECTOR_ROLE } from "@/features/profile/company/manage-employees/model/constants";

import { getGreetingName } from "@/widgets/profile/lib/getGreetingName";

export const CompanyAccount = ({ user }) => {
  const isDirector = user?.role === DIRECTOR_ROLE;

  return (
    <AccountLayout
      title={`Здравствуйте, ${getGreetingName(user)}`}
      subtitle={
        isDirector
          ? "Здесь вы видите все обращения компании и можете создать новое"
          : "Здесь вы видите ваши обращения и можете создать новое"
      }
      sidebar={<CompanyProfileSidebar user={user} />}
    >
      <AppealsSection />
    </AccountLayout>
  );
};
