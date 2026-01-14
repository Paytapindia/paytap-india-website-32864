import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import ProgressIndicator from '@/components/how-it-works-page/ProgressIndicator';
import BuyStep from '@/components/how-it-works-page/BuyStep';
import ReceiveCodeStep from '@/components/how-it-works-page/ReceiveCodeStep';
import SignUpStep from '@/components/how-it-works-page/SignUpStep';
import AddMoneyStep from '@/components/how-it-works-page/AddMoneyStep';
import ActivateInstallStep from '@/components/how-it-works-page/ActivateInstallStep';
import TapPayStep from '@/components/how-it-works-page/TapPayStep';
import ClosingStep from '@/components/how-it-works-page/ClosingStep';

const TOTAL_STEPS = 6;

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
          content="Order your PayTap, receive your activation code, and start paying in minutes. Simple setup from order to first tap." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <BuyStep />
          <ReceiveCodeStep />
          <SignUpStep />
          <AddMoneyStep />
          <ActivateInstallStep />
          <TapPayStep />
          <ClosingStep />
        </main>

        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
