import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollSection from './ScrollSection';

const outcomes = [
  'Centralized vehicle & team expense management',
  'Real-time transaction visibility',
  'Driver spending limits',
  'Fraud protection',
  'Digital records for accounting',
  'Multi-vehicle & team wallet system',
];

const OutcomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-primary text-primary-foreground">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          What You Get With PayTap
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10">One Dashboard. Total Control.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/10 text-left"
            >
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <span className="text-sm font-medium">{o}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};

export default OutcomeSection;
