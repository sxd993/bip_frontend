import ReviewsCarousel from '../features/view-marketing/home/ui/ReviewsCarousel';
import MainSection from '../features/view-marketing/home/ui/MainSection';
import { usePrefetchUser } from '../entities/user/lib/prefetchUser';

export const Home = () => {
  usePrefetchUser();

  return (
    <>
      <MainSection />
      <ReviewsCarousel />
    </>
  );
};
