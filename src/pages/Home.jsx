import ReviewsCarousel from '../features/marketing/home/ui/ReviewsCarousel';
import MainSection from '../features/marketing/home/ui/MainSection';
import { usePrefetchUser } from '../shared/utils/prefetchUser';

export const Home = () => {
  usePrefetchUser();

  return (
    <>
      <MainSection />
      <ReviewsCarousel />
    </>
  );
};
