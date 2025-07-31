import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '../api/userApi';

export function useCurrentUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUserApi,
        staleTime: 1000 * 60 * 60, // 60 минут время жизни данных
        retry: false,
    });
}