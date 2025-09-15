import { getDealStagesApi } from "../../../shared/api/deals/dealsApi";

export const prefetchAppealCategories = async (queryClient) => {
    await queryClient.prefetchQuery({
        queryKey: ['appeal-categories'],
        queryFn: getDealStagesApi,
    });
};