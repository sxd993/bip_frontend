import { Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "@/shared/ui/Loading";
import {
  PhysicalAccount,
  CompanyAccount,
  CompanyManageAccount,
  OrdersAccount,
  CompletedAccount,
} from "@/features/profile";
import { useUser } from "@/entities/auth";

export const Profile = () => {
  const { user, isLoading: userLoading, error } = useUser();

  if (userLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <section className="py-8 text-center sm:py-10">
        <p className="text-error">Ошибка загрузки данных пользователя</p>
      </section>
    );
  }

  return (
    <Routes>
      <Route
        index
        element={
          user?.user_type === "legal" ? (
            <CompanyAccount user={user} />
          ) : (
            <PhysicalAccount user={user} />
          )
        }
      />
      <Route
        path="orders"
        element={<OrdersAccount user={user} />}
      />
      <Route
        path="completed"
        element={<CompletedAccount user={user} />}
      />
      <Route
        path="company"
        element={
          user?.user_type === "legal" ? (
            <CompanyManageAccount user={user} />
          ) : (
            <Navigate to="/personal-account" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/personal-account" replace />} />
    </Routes>
  );
};
