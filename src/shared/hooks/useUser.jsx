import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/account/userApi";


export const useUser = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return { user: data, error, isLoading };
}
