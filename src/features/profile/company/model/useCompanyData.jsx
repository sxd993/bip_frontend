import { useQuery } from '@tanstack/react-query';
import { getCompanyInfoApi } from '@/entities/profile/company';
import { useUser } from '@/entities/auth';

export const useCompanyData = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['companyData'],
    queryFn: getCompanyInfoApi,
    enabled: user?.user_type === 'legal',
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
};
