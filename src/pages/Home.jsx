import { SliderSection } from '@/widgets/ServicesPrivate';
import { usePrefetchUser } from '../entities/business/user/lib/prefetchUser';
import { WelcomeSection } from '@/widgets/home/WelcomeSection/WelcomeSection';
import { ReviewsSection } from '@/widgets/home/ReviewsSection/ui/ReviewsSection';


export const Home = () => {
  usePrefetchUser();

  return (
    <div className='flex flex-col gap-10'>
      <WelcomeSection />
      <SliderSection />
      <ReviewsSection />
    </div>
  );
};
