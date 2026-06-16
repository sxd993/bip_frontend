import { Link } from 'react-router-dom';
import { PhysicalBanner, WelcomeBanner, BusinessBanner } from '@/widgets/home';

export const WelcomeSection = () => {
    return (
        <div className="max-w-[97%] mx-auto mt-5 mb-[10px] flex flex-col gap-[10px]">
            <Link
                to="/ai-chat"
                className="w-full bg-[#1e3a5f] hover:bg-[#16304f] text-white text-xl font-bold py-5 rounded-xl text-center transition-colors duration-200 tracking-wide shadow-md"
            >
                ОНЛАЙН КОНСУЛЬТАЦИЯ
            </Link>
            <div className="home-banners flex flex-col gap-[10px] lg:flex-row lg:items-stretch lg:justify-center lg:!min-h-[600px]">
                <div className="home-banners__item lg:order-2">
                    <WelcomeBanner />
                </div>
                <div className="home-banners__item lg:order-1">
                    <PhysicalBanner />
                </div>
                <div className="home-banners__item lg:order-3">
                    <BusinessBanner />
                </div>
            </div>
        </div>
    )
}