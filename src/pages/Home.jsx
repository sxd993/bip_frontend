import { SliderSection } from '@/widgets/ServicesPrivate';
import { usePrefetchUser } from '../entities/business/user/lib/prefetchUser';
import { WelcomeSection } from '@/widgets/home/WelcomeSection/WelcomeSection';
import { ReviewsSection } from '@/widgets/home/ReviewsSection/ui/ReviewsSection';
import { ArticleSection } from '@/widgets/home/ArticleSection/ArticleSection';


export const Home = () => {
  usePrefetchUser();

  return (
    <div className='flex flex-col gap-10'>
      <WelcomeSection />
      <SliderSection />
      <ReviewsSection />
      <ArticleSection/>
    </div>
  );
};
