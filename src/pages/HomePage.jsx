import { usePrefetchUser } from '@/entities/auth';
import { WelcomeSection } from '@/widgets/home';

export const HomePage = () => {
  usePrefetchUser();

  return (
    <div className="flex flex-col gap-10">
      <WelcomeSection />
    </div>
  );
};
