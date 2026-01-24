import { lazy, Suspense, memo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ComplianceBadgeBar from "@/components/ComplianceBadgeBar";
import MobileAppSection from "@/components/MobileAppSection";
import TrustSection from "@/components/TrustSection";
import ContactFormModal from "@/components/ContactFormModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useModal } from "@/contexts/ModalContext";

// Lazy load below-fold sections for better mobile performance
const OurProductsSection = lazy(() => import("@/components/OurProductsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const PressSection = lazy(() => import("@/components/PressSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

// Skeleton loader for lazy-loaded sections
const SectionSkeleton = memo(() => (
  <div className="py-16 md:py-24 px-6 animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4" />
      <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-48 bg-muted rounded-xl" />
      </div>
    </div>
  </div>
));

SectionSkeleton.displayName = 'SectionSkeleton';

const Index = () => {
  const { isContactFormOpen, setContactFormOpen } = useModal();
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://paytap.co.in/" />
      </Helmet>
      <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ComplianceBadgeBar />
      <MobileAppSection />
      <TrustSection />
      
      {/* Lazy-loaded sections for better mobile performance */}
      <Suspense fallback={<SectionSkeleton />}>
        <OurProductsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PressSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FooterSection />
      </Suspense>
      
      <StickyMobileCTA />
      <ContactFormModal 
        open={isContactFormOpen} 
        onOpenChange={setContactFormOpen}
      />
    </div>
    </>
  );
};

export default Index;
