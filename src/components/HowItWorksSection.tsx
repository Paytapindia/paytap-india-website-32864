
import React, { useState } from 'react';
import { steps } from './how-it-works/stepsData';
import StepVisual from './how-it-works/StepVisual';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RBIIcon } from './icons/RBIIcon';
import { NPCIIcon } from './icons/NPCIIcon';
import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  
  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 1M+ Users
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Desktop Interactive Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Timeline */}
            <div className="col-span-5">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      activeStep === step.id ? 'transform scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {/* Timeline connector */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-200 to-purple-200" />
                    )}
                    
                    {/* Step Card */}
                    <div className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'bg-white shadow-lg border-blue-200 ring-2 ring-blue-100' 
                        : 'bg-white/70 border-gray-100 hover:bg-white hover:shadow-md'
                    }`}>
                      <div className="flex items-start gap-4">
                        {/* Step Number */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          activeStep === step.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.id}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                            activeStep === step.id ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Pane */}
            <div className="col-span-7">
              <div className="sticky top-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[500px] flex items-center justify-center">
                  <div className={`w-full h-80 bg-gradient-to-br ${steps[activeStep - 1].bgColor} rounded-2xl flex items-center justify-center border border-blue-100 transition-all duration-500 transform ${
                    activeStep ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
                  }`}>
                    <StepVisual 
                      visual={steps[activeStep - 1].visual} 
                      icon={steps[activeStep - 1].icon} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem key={step.id}>
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                    {/* Step Number */}
                    <div className="flex justify-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.id}
                      </div>
                    </div>
                    
                    {/* Visual */}
                    <div className={`w-full h-48 bg-gradient-to-br ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 border border-blue-100`}>
                      <StepVisual visual={step.visual} icon={step.icon} />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-8 mt-16">
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
              <RBIIcon size={32} />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">RBI Regulated</div>
                <div className="text-xs text-gray-500">Secure & Compliant</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
              <NPCIIcon size={32} />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">NPCI Certified</div>
                <div className="text-xs text-gray-500">Bank-Grade Security</div>
              </div>
            </div>
          </div>

          {/* Quick Setup Highlight */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 rounded-3xl border border-blue-200 shadow-sm">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div>
              <div className="text-blue-700 font-bold text-lg">Setup in under 5 minutes</div>
              <div className="text-blue-600 text-sm">No paperwork • Instant activation • Works everywhere</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col gap-4 items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl hover:scale-105 min-h-[60px]"
              onClick={handleRedirect}
            >
              Order Your PayTap Tag Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <p className="text-gray-500">✓ Free delivery • ✓ 24/7 support • ✓ Works offline</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
