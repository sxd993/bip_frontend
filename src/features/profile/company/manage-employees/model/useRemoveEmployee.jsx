import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeEmployeeApi } from "@/entities/company";

export const useRemoveEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-employees"] });
    },
  });
};
