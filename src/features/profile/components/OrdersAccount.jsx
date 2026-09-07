import { AccountLayout } from "@/widgets/profile/ui/AccountLayout";
import { PhysicalProfileSidebar } from "@/widgets/profile/ui/PhysicalProfileSidebar";
import { CompanyProfileSidebar } from "@/widgets/profile/ui/CompanyProfileSidebar";
import { PendingOrdersSection } from "@/features/order/pending-order";
import { usePaymentReturn } from "@/features/balance";
import { getGreetingName } from "@/widgets/profile/lib/getGreetingName";

export const OrdersAccount = ({ user }) => {
  const { syncError } = usePaymentReturn();
  const isLegal = user?.user_type === "legal";
  const sidebar = isLegal ? (
    <CompanyProfileSidebar user={user} />
  ) : (
    <PhysicalProfileSidebar user={user} />
  );

  return (
    <AccountLayout
      title={`Здравствуйте, ${getGreetingName(user)}`}
      subtitle="Неоплаченные заявки после консультации с интеллектуальным помощником"
      sidebar={sidebar}
    >
      <PendingOrdersSection syncError={syncError} />
    </AccountLayout>
  );
};
