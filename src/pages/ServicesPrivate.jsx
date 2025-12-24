import { HeroSection } from "@/widgets/ServicesPrivate";
import { ServicesSection } from "@/widgets/ServicesPrivate/ui/ServicesSection/ServicesSection";
import { FAQSection } from "@/widgets/ServicesPrivate";

const ServicesPrivate = () => {


  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <FAQSection />
    </div>
  );
};

export default ServicesPrivate;
