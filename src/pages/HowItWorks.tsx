import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProgressIndicator from '@/components/how-it-works-page/ProgressIndicator';
import HeroStep from '@/components/how-it-works-page/HeroStep';
import SignUpStep from '@/components/how-it-works-page/SignUpStep';
import VirtualCardStep from '@/components/how-it-works-page/VirtualCardStep';
import AddMoneyStep from '@/components/how-it-works-page/AddMoneyStep';
import ChoosePaymentStep from '@/components/how-it-works-page/ChoosePaymentStep';
import ClosingStep from '@/components/how-it-works-page/ClosingStep';

const TOTAL_STEPS = 5;

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = window.scrollY / scrollHeight;
      const step = Math.min(Math.floor(scrollProgress * TOTAL_STEPS), TOTAL_STEPS - 1);
      setCurrentStep(step);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>How It Works - PayTap | Set Up in Under a Minute</title>
        <meta 
          name="description" 
          content="Set up PayTap in under a minute. From sign-up to first payment — instantly. Quick KYC, virtual card, and contactless payments." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <HeroStep />
          <SignUpStep />
          <VirtualCardStep />
          <AddMoneyStep />
          <ChoosePaymentStep />
          <ClosingStep />
        </main>

        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
