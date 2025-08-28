import { useQuery } from "@tanstack/react-query"
import { client } from '../api/client'

export const useUser = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const response = await client.get("/user/get-info");
                return response.data; // пользователь авторизован
            } catch (err) {
                if (err.response?.status === 401) {
                    return null; // не авторизован
                }
                throw err; // другая ошибка
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    return { user: data, error, isLoading };
}
