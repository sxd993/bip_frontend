import { SliderSection } from "@/widgets/ServicesBusiness";
import { ServicesSection } from "@/widgets/ServicesBusiness/ui/ServicesSection/ServicesSection";
import { FAQSection } from "@/widgets/ServicesBusiness";
import { ArticleSection } from "@/widgets/home/ArticleSection/ArticleSection";
import { ReviewsSection } from "@/widgets/home/ReviewsSection/ui/ReviewsSection";

const ServicesPrivate = () => {


  return (
    <div className="min-h-screen">
      <SliderSection />
      <ServicesSection />
      <ReviewsSection />
      <ArticleSection />
      <FAQSection />
    </div>
  );
};

export default ServicesPrivate;