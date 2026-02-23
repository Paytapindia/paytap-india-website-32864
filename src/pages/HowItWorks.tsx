import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProgressIndicator from '@/components/how-it-works-page/ProgressIndicator';
import HeroHookSection from '@/components/how-it-works-page/HeroHookSection';
import ProblemHookSection from '@/components/how-it-works-page/ProblemHookSection';
import AudienceSection from '@/components/how-it-works-page/AudienceSection';
import AccountTypeSection from '@/components/how-it-works-page/AccountTypeSection';
import PaymentToolsSection from '@/components/how-it-works-page/PaymentToolsSection';
import SetupStepsSection from '@/components/how-it-works-page/SetupStepsSection';
import ScaleSection from '@/components/how-it-works-page/ScaleSection';
import OutcomeSection from '@/components/how-it-works-page/OutcomeSection';
import MyFleetBonusSection from '@/components/how-it-works-page/MyFleetBonusSection';
import ComparisonCTASection from '@/components/how-it-works-page/ComparisonCTASection';

const TOTAL_STEPS = 10;

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
        <title>How PayTap Works | Vehicle Payment Control System</title>
        <meta
          name="description"
          content="Stop giving drivers cash. PayTap gives vehicle owners complete payment control with NFC tags, prepaid cards, spending limits, and real-time tracking."
        />
        <link rel="canonical" href="https://paytap.co.in/how-it-works" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroHookSection />
          <ProblemHookSection />
          <AudienceSection />
          <AccountTypeSection />
          <PaymentToolsSection />
          <SetupStepsSection />
          <ScaleSection />
          <OutcomeSection />
          <MyFleetBonusSection />
          <ComparisonCTASection />
        </main>
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
