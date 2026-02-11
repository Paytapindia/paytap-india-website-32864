import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProgressIndicator from '@/components/how-it-works-page/ProgressIndicator';

// Eager load first step for instant visibility
import CreateAccountStep from '@/components/how-it-works-page/CreateAccountStep';

// Lazy load remaining steps
const ConfigureControlsStep = lazy(() => import('@/components/how-it-works-page/ConfigureControlsStep'));
const DeployTagsStep = lazy(() => import('@/components/how-it-works-page/DeployTagsStep'));
const MonitorStep = lazy(() => import('@/components/how-it-works-page/MonitorStep'));
const ScaleStep = lazy(() => import('@/components/how-it-works-page/ScaleStep'));
const PlatformAccessBanner = lazy(() => import('@/components/how-it-works-page/PlatformAccessBanner'));

const TOTAL_STEPS = 5;

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
        <title>How Paytap Works | From Account Setup to Payment Control</title>
        <meta 
          name="description" 
          content="Create your Paytap account, configure controls, deploy NFC tags, and scale with enterprise-grade payment intelligence. RBI-compliant platform for individuals, teams, and fleets." 
        />
        <link rel="canonical" href="https://paytap.co.in/how-it-works" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          {/* Header Section */}
          <section className="pt-24 pb-8 text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              How Paytap Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From Account Setup to Enterprise-Grade Payment Control
            </p>
          </section>

          <Suspense fallback={<StepSkeleton />}>
            <PlatformAccessBanner />
          </Suspense>
          <CreateAccountStep />
          <Suspense fallback={<StepSkeleton />}>
            <ConfigureControlsStep />
          </Suspense>
          <Suspense fallback={<StepSkeleton />}>
            <DeployTagsStep />
          </Suspense>
          <Suspense fallback={<StepSkeleton />}>
            <MonitorStep />
          </Suspense>
          <Suspense fallback={<StepSkeleton />}>
            <ScaleStep />
          </Suspense>
        </main>

        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
