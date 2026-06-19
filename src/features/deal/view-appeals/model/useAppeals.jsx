import { useQuery } from "@tanstack/react-query";
import { getDealsApi } from "@/entities/deals";
import { useUser } from "@/entities/auth";

export const useAppeals = (refetchInterval = 30000) => {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery({
    queryKey: ["appeals", userId],
    queryFn: getDealsApi,
    refetchInterval,
    enabled: Boolean(userId),
  });
};
