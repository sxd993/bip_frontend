import { PhysicalAccount, CompanyAccount } from "@/features/profile";
import { useUser } from "@/entities/auth";

export const Profile = () => {
  const { user, isLoading: userLoading, error } = useUser();

  if (error) {
    return (
      <section className="py-8 text-center sm:py-10">
        <p className="text-error">Ошибка загрузки данных пользователя</p>
      </section>
    );
  }

  return (
    <div>
      {user?.user_type === "legal" ? (
        <CompanyAccount user={user} isLoading={userLoading} />
      ) : (
        <PhysicalAccount user={user} isLoading={userLoading} />
      )}
    </div>
  );
};
