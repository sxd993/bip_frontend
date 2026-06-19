import { useState } from "react";
import { DIRECTOR_ROLE } from "../model/constants";
import { useRemoveEmployee } from "../model/useRemoveEmployee";

export const EmployeeCard = ({ employee }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const removeEmployee = useRemoveEmployee();
  const canRemove = employee.role !== DIRECTOR_ROLE;

  const handleRemove = async () => {
    try {
      await removeEmployee.mutateAsync(employee.id);
      setIsConfirming(false);
    } catch {
      setIsConfirming(false);
    }
  };

  const removeError =
    removeEmployee.error?.response?.data?.error ||
    removeEmployee.error?.message ||
    null;

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-semibold text-text sm:text-base">
            {employee.full_name}
          </p>
          <p className="text-xs font-semibold text-primary sm:text-sm">
            {employee.role}
          </p>
          <p className="text-xs text-text-muted sm:text-sm">{employee.email}</p>
          {employee.phone && (
            <p className="text-xs text-text-muted sm:text-sm">{employee.phone}</p>
          )}
        </div>

        {canRemove && (
          <div className="flex shrink-0 items-center gap-3">
            {isConfirming ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsConfirming(false)}
                  disabled={removeEmployee.isPending}
                  className="cursor-pointer text-xs font-medium text-text-muted transition hover:text-text disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={removeEmployee.isPending}
                  className="cursor-pointer text-xs font-medium text-primary transition hover:text-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                >
                  {removeEmployee.isPending ? "Удаление..." : "Подтвердить"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirming(true)}
                className="cursor-pointer text-xs font-medium text-primary transition hover:text-primary-hover sm:text-sm"
              >
                Удалить
              </button>
            )}
          </div>
        )}
      </div>

      {removeError && (
        <p className="mt-3 text-xs text-error sm:text-sm">{removeError}</p>
      )}
    </article>
  );
};
