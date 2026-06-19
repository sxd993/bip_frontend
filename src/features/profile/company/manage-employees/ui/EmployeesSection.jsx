import { useState } from "react";
import { Loading } from "@/shared/ui/Loading";
import { Button } from "@/shared/ui/Button";
import { useEmployees } from "../model/useEmployees";
import { EmployeeCard } from "./EmployeeCard";
import { InviteEmployeeModal } from "./InviteEmployeeModal";

export const EmployeesSection = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { employees, invites, totalCount, isLoading, error } = useEmployees();

  if (isLoading) {
    return <Loading size="medium" text="Загрузка сотрудников..." />;
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-error">
          Ошибка загрузки: {error.response?.data?.error || error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div>
          <h2 className="text-lg font-semibold text-text sm:text-xl lg:text-xl">
            Сотрудники
          </h2>
          <p className="mt-1 text-sm text-text-muted sm:text-base lg:text-sm">
            {totalCount === 0
              ? "Создайте ссылку для регистрации сотрудника"
              : `Всего в компании: ${totalCount}`}
          </p>
        </div>
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          className="w-full max-w-xs shrink-0 sm:w-auto lg:self-auto"
        >
          Пригласить сотрудника
        </Button>
      </div>

      {invites.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-text sm:text-base">
            Ожидают регистрации
          </h3>
          <div className="flex flex-col gap-3">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="rounded-xl border border-dashed border-border bg-background px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="text-sm font-medium text-text">{invite.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {employees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-background px-6 py-10 text-center">
          <h3 className="mb-2 text-base font-medium text-text sm:text-lg">
            Пока нет сотрудников
          </h3>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-muted sm:text-base lg:text-sm">
            Создайте ссылку и отправьте её сотруднику — он сможет
            зарегистрироваться и получить доступ к обращениям компании
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}

      <InviteEmployeeModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};
