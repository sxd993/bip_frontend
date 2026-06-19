import { Navigate } from "react-router-dom";
import { AccountLayout } from "@/widgets/profile/ui/AccountLayout";
import { CompanyProfileSidebar } from "@/widgets/profile/ui/CompanyProfileSidebar";
import { EmployeesSection } from "@/features/profile/company/manage-employees/ui/EmployeesSection";
import { DIRECTOR_ROLE } from "@/features/profile/company/manage-employees/model/constants";

export const CompanyManageAccount = ({ user }) => {
  if (user?.role !== DIRECTOR_ROLE) {
    return <Navigate to="/personal-account" replace />;
  }

  return (
    <AccountLayout
      title="Управление компанией"
      subtitle="Приглашайте сотрудников в личный кабинет компании"
      sidebar={<CompanyProfileSidebar user={user} />}
    >
      <EmployeesSection />
    </AccountLayout>
  );
};
