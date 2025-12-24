import { HeroSection } from "@/widgets/ServicesPrivate";
import { ServicesSection } from "@/widgets/ServicesPrivate/ui/ServicesSection/ServicesSection";
import { FAQSection } from "@/widgets/ServicesPrivate";
import { ArticleSection } from "@/widgets/home/ArticleSection/ArticleSection";
import { ReviewsSection } from "@/widgets/home/ReviewsSection/ui/ReviewsSection";

const ServicesPrivate = () => {


  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ReviewsSection />
      <ArticleSection />
      <FAQSection />
    </div>
  );
};

export default ServicesPrivate;
