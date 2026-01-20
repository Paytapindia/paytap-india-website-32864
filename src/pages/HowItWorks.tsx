import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProgressIndicator from '@/components/how-it-works-page/ProgressIndicator';

// Eager load first 2 steps for instant visibility
import BuyStep from '@/components/how-it-works-page/BuyStep';
import ReceiveCodeStep from '@/components/how-it-works-page/ReceiveCodeStep';

// Lazy load remaining steps
const SignUpStep = lazy(() => import('@/components/how-it-works-page/SignUpStep'));
const ClosingStep = lazy(() => import('@/components/how-it-works-page/ClosingStep'));

const TOTAL_STEPS = 4;

// Simple loading skeleton for step sections
const StepSkeleton = memo(() => (
  <div className="min-h-[60vh] md:min-h-screen flex items-center justify-center py-12 px-4">
    <div className="max-w-5xl mx-auto w-full">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-20 bg-muted rounded-full mx-auto" />
        <div className="h-10 w-64 bg-muted rounded-lg mx-auto" />
        <div className="h-4 w-48 bg-muted rounded mx-auto" />
      </div>
    </div>
  </div>
));

StepSkeleton.displayName = 'StepSkeleton';

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = window.scrollY / scrollHeight;
          const step = Math.min(Math.floor(scrollProgress * TOTAL_STEPS), TOTAL_STEPS - 1);
          setCurrentStep(step);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>How It Works - PayTap | Smart Payment Control Platform</title>
        <meta 
          name="description" 
          content="Set up PayTap in minutes. Track spending, set limits, and manage tags, vehicles, or teams — all from one app." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Header Section */}
          <section className="pt-24 pb-4 text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Set Up PayTap in Minutes
            </h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Track spending, set limits, and manage tags, vehicles, or teams — from one app
            </p>
          </section>

          <BuyStep />
          <ReceiveCodeStep />
          <Suspense fallback={<StepSkeleton />}>
            <SignUpStep />
          </Suspense>
          <Suspense fallback={<StepSkeleton />}>
            <ClosingStep />
          </Suspense>
        </main>

        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
