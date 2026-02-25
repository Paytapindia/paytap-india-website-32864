import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingCart, Monitor, CarFront } from 'lucide-react';
import ScrollSection from './ScrollSection';

const scaleSteps = [
  { icon: ShoppingCart, text: 'Order additional PayTap tags' },
  { icon: Monitor, text: 'Activate in dashboard' },
  { icon: CarFront, text: 'Assign to vehicle or team' },
];

const ScaleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-muted/50">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10">
          Managing multiple vehicles or teams?
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
          {scaleSteps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{s.text}</span>
              {i < scaleSteps.length - 1 && (
                <span className="hidden md:block text-muted-foreground text-xl ml-4">→</span>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-lg font-semibold text-accent">
          Add vehicles & teams in seconds. Not days.
        </p>
      </div>
    </ScrollSection>
  );
};

export default ScaleSection;
