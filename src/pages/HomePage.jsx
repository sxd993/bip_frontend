import { usePrefetchUser } from '@/entities/auth';
import { WelcomeSection } from '@/widgets/home';

export const HomePage = () => {
  usePrefetchUser();

  return (
    <section className="flex flex-1 flex-col py-8 sm:py-10">
      <WelcomeSection />
    </section>
  );
};
