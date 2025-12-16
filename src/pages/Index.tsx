
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OurProductsSection from "@/components/OurProductsSection";
import MyfleetPromo from "@/components/MyfleetPromo";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import ContactFormModal from "@/components/ContactFormModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useModal } from "@/contexts/ModalContext";

const Index = () => {
  const { isContactFormOpen, setContactFormOpen } = useModal();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OurProductsSection />
      <MyfleetPromo />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
      <StickyMobileCTA />
      <ContactFormModal 
        open={isContactFormOpen} 
        onOpenChange={setContactFormOpen}
      />
    </div>
  );
};

export default Index;
