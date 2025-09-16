import { useQuery, } from '@tanstack/react-query';
import { getDealsApi, getDealStagesApi } from '../../../shared/api/deals/dealsApi';

export const useAppeals = (refetchInterval = 30000) => {
  return useQuery({
    queryKey: ['appeals'],
    queryFn: getDealsApi,
    refetchInterval,
  });
};

export const useAppealCategories = () => {
  return useQuery({
    queryKey: ['appeal-categories'],
    queryFn: getDealStagesApi,
  });
};
