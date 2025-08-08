import { useQuery } from "@tanstack/react-query";
import { getCompanyInfoApi, getCompanyEmployeesApi } from "../api/personal_account/Legal/companyApi";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const useCompanyData = () => {
    const { data: user } = useCurrentUser();
    
    return useQuery({
        queryKey: ['companyData'],
        queryFn: getCompanyInfoApi,
        enabled: user?.user_type === 'legal',
        staleTime: 1000 * 60 * 60, // 60 минут
        retry: false,
    });
};

export const useCompanyEmployees = () => {
    const { data: user } = useCurrentUser();
    
    return useQuery({
        queryKey: ['companyEmployees'],
        queryFn: getCompanyEmployeesApi,
        enabled: user?.role === 'Руководитель',
        staleTime: 1000 * 60 * 60, // 60 минут
        retry: false,
    });
};