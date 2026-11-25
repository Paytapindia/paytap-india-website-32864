import { lazy, Suspense, memo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import CompanyVideoGallery from "@/components/home/CompanyVideoGallery";
import ProblemTransformationSection from "@/components/home/ProblemTransformationSection";
import ContactFormModal from "@/components/ContactFormModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useModal } from "@/contexts/ModalContext";

// Lazy load below-fold sections for better mobile performance
const IntelligenceAndAIDemo = lazy(() => import("@/components/home/IntelligenceAndAIDemo"));
const UnifiedDashboardAndCapabilities = lazy(
  () => import("@/components/home/UnifiedDashboardAndCapabilities")
);
const HowIntelligenceAndScale = lazy(() => import("@/components/home/HowIntelligenceAndScale"));
const TimeBackAndGovernance = lazy(() => import("@/components/home/TimeBackAndGovernance"));
const PlansTrustAndConversion = lazy(() => import("@/components/home/PlansTrustAndConversion"));
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
      <HomeHero />
      <CompanyVideoGallery />
      <ProblemTransformationSection />
      <Suspense fallback={<SectionSkeleton />}>
        <IntelligenceAndAIDemo />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <UnifiedDashboardAndCapabilities />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <HowIntelligenceAndScale />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TimeBackAndGovernance />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <PlansTrustAndConversion />
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
