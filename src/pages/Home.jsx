import { usePrefetchUser } from '../entities/business/user/lib/prefetchUser';
import { WelcomeSection } from '@/widgets/home/WelcomeSection/WelcomeSection';


export const Home = () => {
  usePrefetchUser();

  return (
    <div className='flex flex-col gap-10'>
      <WelcomeSection />
    </div>
  );
};
