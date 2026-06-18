import { getDealStagesApi } from '@/entities/deals';

export const prefetchAppealCategories = async (queryClient) => {
    await queryClient.prefetchQuery({
        queryKey: ['appeal-categories'],
        queryFn: getDealStagesApi,
    });
};