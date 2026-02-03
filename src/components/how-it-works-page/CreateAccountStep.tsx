import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { UserPlus, Check, User, Building2, Truck, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollSection from './ScrollSection';

const deploymentTypes = [
  { icon: User, label: "Personal", description: "Individual use" },
  { icon: Building2, label: "Team", description: "Business teams" },
  { icon: Truck, label: "Fleet", description: "Vehicle fleets" },
  { icon: Briefcase, label: "Enterprise", description: "Large scale" },
];

const checklistItems = [
  "Account creation & basic KYC",
  "Platform access activation",
  "Choose your deployment type",
  "Access your live dashboard",
];

const CreateAccountStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState(1);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isInView) {
      const baseDelay = prefersReducedMotion ? 0 : (isMobile ? 100 : 200);
      const interval = prefersReducedMotion ? 0 : (isMobile ? 150 : 300);
      
      const timers = [
        setTimeout(() => setStep(1), baseDelay),
        setTimeout(() => setStep(2), baseDelay + interval),
        setTimeout(() => setStep(3), baseDelay + interval * 2),
        setTimeout(() => setStep(4), baseDelay + interval * 3),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView, prefersReducedMotion, isMobile]);

  const getDelay = (delay: number) => {
    if (prefersReducedMotion) return 0;
    return isMobile ? delay * 0.5 : delay;
  };

  return (
    <ScrollSection className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-12 md:py-20 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Visual - Account creation mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Create Account</div>
                  <div className="text-xs text-muted-foreground">Access Paytap Platform</div>
                </div>
              </motion.div>

              {/* Deployment type selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <div className="text-xs text-muted-foreground mb-2">Choose deployment type</div>
                <div className="grid grid-cols-2 gap-2">
                  {deploymentTypes.map((type, index) => (
                    <button
                      key={type.label}
                      onClick={() => setSelectedType(index)}
                      className={`p-3 rounded-xl border transition-all ${
                        selectedType === index 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-muted/30 hover:border-primary/50'
                      }`}
                    >
                      <type.icon className={`w-5 h-5 mx-auto mb-1 ${
                        selectedType === index ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className={`text-xs font-medium ${
                        selectedType === index ? 'text-primary' : 'text-foreground'
                      }`}>{type.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Progress checklist */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="space-y-2 mb-4"
              >
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      index <= step - 1 ? 'bg-green-500' : 'bg-muted'
                    }`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-foreground">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="bg-primary text-white rounded-xl p-3 flex items-center justify-center gap-2 font-medium text-sm"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Step 01
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2 tracking-tight">
              Create Your Paytap Account
            </h2>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4">
              Access the Payment Control Platform
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0 mb-6">
              Start by creating your Paytap account and completing quick onboarding. This gives you access to our RBI-compliant prepaid and transaction management platform — designed for individuals, teams, and enterprise operators.
            </p>

            {/* What happens here */}
            <div className="space-y-3 mb-6">
              <div className="text-sm font-semibold text-foreground mb-2">What happens here:</div>
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Outcome box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: getDelay(0.4) }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">Outcome</div>
                  <p className="text-sm text-muted-foreground">
                    You now have a secure, regulated payment environment ready to deploy across vehicles, teams, or operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

CreateAccountStep.displayName = 'CreateAccountStep';

export default CreateAccountStep;
