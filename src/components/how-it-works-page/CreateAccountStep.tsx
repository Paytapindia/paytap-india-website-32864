import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import { UserPlus, Check, User, Building2, Truck, Briefcase, ArrowRight } from 'lucide-react';
import ScrollSection from './ScrollSection';

const deploymentTypes = [
  { icon: User, label: "Personal" },
  { icon: Building2, label: "Team" },
  { icon: Truck, label: "Fleet" },
  { icon: Briefcase, label: "Enterprise" },
];

const bullets = [
  "Complete basic KYC",
  "Choose deployment type",
  "Access your live dashboard",
];

const CreateAccountStep = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [selectedType, setSelectedType] = useState(1);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <ScrollSection className="min-h-[50vh] md:min-h-[70vh] flex items-center justify-center py-8 md:py-12 px-4 bg-background">
      <div ref={ref} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Visual - Account creation mockup */}
        <div className="relative mx-auto order-2 md:order-1">
          <div className="w-full max-w-sm bg-foreground/5 rounded-2xl p-3 border border-border/30 shadow-xl">
            <div className="bg-background rounded-xl p-4">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 mb-4"
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
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4"
              >
                <div className="grid grid-cols-4 gap-2">
                  {deploymentTypes.map((type, index) => (
                    <button
                      key={type.label}
                      onClick={() => setSelectedType(index)}
                      className={`p-2 rounded-lg border transition-all ${
                        selectedType === index 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-muted/30'
                      }`}
                    >
                      <type.icon className={`w-4 h-4 mx-auto mb-1 ${
                        selectedType === index ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className={`text-[10px] font-medium ${
                        selectedType === index ? 'text-primary' : 'text-foreground'
                      }`}>{type.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
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
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Step 01
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2 tracking-tight">
              Create Your Paytap Account
            </h2>
            <p className="text-base sm:text-lg text-primary font-medium mb-4">
              Quick KYC. Instant dashboard access.
            </p>

            {/* Bullets */}
            <div className="space-y-2">
              {bullets.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
});

CreateAccountStep.displayName = 'CreateAccountStep';

export default CreateAccountStep;
