import { useQuery } from "@tanstack/react-query";
import { getDealsApi } from "@/entities/deals";
import { useUser } from "@/entities/auth";

export const useAppeals = ({ closed = false, refetchInterval = 30000 } = {}) => {
  const { user } = useUser();
  const userId = user?.id;

  return useQuery({
    queryKey: ["appeals", userId, closed ? "closed" : "open"],
    queryFn: () => getDealsApi({ closed }),
    refetchInterval: closed ? false : refetchInterval,
    enabled: Boolean(userId),
  });
};
