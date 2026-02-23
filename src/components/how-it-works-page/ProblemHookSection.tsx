import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, Ban, Eye, Clock, ShieldAlert } from 'lucide-react';
import ScrollSection from './ScrollSection';

const problems = [
  { icon: AlertTriangle, text: 'Cash handled by drivers' },
  { icon: Ban, text: 'No spending limits' },
  { icon: Eye, text: 'No proof of payments' },
  { icon: Clock, text: 'No real-time tracking' },
  { icon: ShieldAlert, text: 'Fraud risk' },
];

const ProblemHookSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
          Vehicle Expenses Are Leaking Money Every Day
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">Most vehicle owners face this:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-10">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10"
            >
              <p.icon className="w-7 h-7 text-destructive" />
              <span className="text-sm font-medium text-foreground">{p.text}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-lg font-semibold text-foreground">
          If you don't control payments, you don't control costs.
        </p>
      </div>
    </ScrollSection>
  );
};

export default ProblemHookSection;
