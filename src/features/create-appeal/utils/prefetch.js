import { getDealStagesApi } from "../../../entities/deal/api/dealsApi";

export const prefetchAppealCategories = async (queryClient) => {
    await queryClient.prefetchQuery({
        queryKey: ['appeal-categories'],
        queryFn: getDealStagesApi,
    });
};