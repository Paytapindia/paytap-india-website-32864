import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tag, Wallet, Sliders, UserCheck, CheckCircle2 } from 'lucide-react';
import ScrollSection from './ScrollSection';

const steps = [
  { icon: Tag, text: 'Install NFC tag or issue prepaid card' },
  { icon: Wallet, text: 'Add money via UPI/Card/Net Banking' },
  { icon: Sliders, text: 'Set limits + controls' },
  { icon: UserCheck, text: 'Assign driver' },
];

const SetupStepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10">
          Setup takes minutes
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
              <span className="text-sm font-medium text-foreground">{s.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Payments start instantly
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Every transaction tracked live
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default SetupStepsSection;
