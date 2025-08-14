import { useQuery } from "@tanstack/react-query";
import { getCompanyInfoApi, getCompanyEmployeesApi } from "../api/companyApi";
import { useUser } from "../hooks/useUser";

export const useCompanyData = () => {
    const { user } = useUser();
    
    return useQuery({
        queryKey: ['companyData'],
        queryFn: getCompanyInfoApi,
        enabled: user?.user_type === 'legal',
        staleTime: 1000 * 60 * 60, // 60 минут
        retry: false,
    });
};

export const useCompanyEmployees = () => {
    const { user } = useUser();
    
    return useQuery({
        queryKey: ['companyEmployees'],
        queryFn: getCompanyEmployeesApi,
        enabled: user?.role === 'Руководитель',
        staleTime: 1000 * 60 * 60, // 60 минут
        retry: false,
    });
};