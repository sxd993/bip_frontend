import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentDealsApi, createAppealApi, getDealStagesApi } from '../api/dealsApi';

export const useAppeals = (refetchInterval = 30000) => {
  return useQuery({
    queryKey: ['appeals'],
    queryFn: getCurrentDealsApi,
    refetchInterval,
  });
};

export const useCreateAppeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppealApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['appeals']);
    },
  });
};

export const useAppealCategories = () => {
  return useQuery({
    queryKey: ['appeal-categories'],
    queryFn: getDealStagesApi,
  });
};

export const prefetchAppealCategories = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['appeal-categories'],
    queryFn: getDealStagesApi,
  });
};