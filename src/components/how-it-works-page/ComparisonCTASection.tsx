import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Check } from 'lucide-react';

import ScrollSection from './ScrollSection';

const comparisons = [
  { without: 'Cash payments', with: 'Digital tracking' },
  { without: 'No limits', with: 'Custom limits' },
  { without: 'No proof', with: 'Live records' },
  { without: 'Driver control', with: 'Owner control' },
];

const ComparisonCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-muted/50">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden border border-border mb-12">
          <div className="grid grid-cols-2">
            <div className="bg-destructive/10 p-4 text-center font-bold text-destructive text-sm">
              Without PayTap
            </div>
            <div className="bg-primary/10 p-4 text-center font-bold text-primary text-sm">
              With PayTap
            </div>
          </div>
          {comparisons.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="grid grid-cols-2 border-t border-border"
            >
              <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground bg-card">
                <X className="w-4 h-4 text-destructive shrink-0" />
                {c.without}
              </div>
              <div className="p-4 flex items-center gap-2 text-sm font-medium text-foreground bg-card">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {c.with}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Viral closing + CTA */}
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Drivers Spend. Owners Stay in Control.
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">
            Take Control of Your Vehicle & Team Payments Today
          </h2>

          <Link
            to="/checkout"
            className="px-8 py-3.5 bg-accent text-accent-foreground rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Get Access
          </Link>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ComparisonCTASection;
