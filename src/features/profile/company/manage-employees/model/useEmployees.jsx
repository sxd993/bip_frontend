import { useQuery } from "@tanstack/react-query";
import {
  getCompanyEmployeesApi,
  getCompanyInvitesApi,
} from "@/entities/company";
import { useUser } from "@/entities/auth";

export const useEmployees = (enabled = true) => {
  const { user } = useUser();
  const userId = user?.id;
  const isQueryEnabled = enabled && Boolean(userId);

  const employeesQuery = useQuery({
    queryKey: ["company-employees", userId],
    queryFn: getCompanyEmployeesApi,
    enabled: isQueryEnabled,
  });

  const invitesQuery = useQuery({
    queryKey: ["company-invites", userId],
    queryFn: getCompanyInvitesApi,
    enabled: isQueryEnabled,
  });

  const isLoading = employeesQuery.isLoading || invitesQuery.isLoading;
  const error = employeesQuery.error || invitesQuery.error;

  return {
    employees: employeesQuery.data?.employees ?? [],
    totalCount: employeesQuery.data?.total_count ?? 0,
    invites: invitesQuery.data?.invites ?? [],
    isLoading,
    error,
  };
};
