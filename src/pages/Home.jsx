import { usePrefetchUser } from '../entities/user/lib/prefetchUser';
import { PhysicalBanner, WelcomeBanner, BusinessBanner } from '@/widgets/home';

export const Home = () => {
  usePrefetchUser();

  return (
    <div className="home-banners min-h-screen max-w-[97%] mx-auto mt-5 mb-[10px] flex flex-col gap-[10px] lg:flex-row lg:items-stretch lg:justify-center">
      <div className="home-banners__item lg:order-1">
        <PhysicalBanner />
      </div>
      <div className="home-banners__item lg:order-2">
        <WelcomeBanner />
      </div>
      <div className="home-banners__item lg:order-3">
        <BusinessBanner />
      </div>
    </div>
  );
};
