import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, BarChart3, Wrench, TrendingUp } from 'lucide-react';
import ScrollSection from './ScrollSection';

const features = [
  { icon: MapPin, title: 'Vehicle Tracking' },
  { icon: BarChart3, title: 'Cost Analytics' },
  { icon: Wrench, title: 'Maintenance Alerts' },
  { icon: TrendingUp, title: 'Performance Insights' },
];

const MyFleetBonusSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold mb-4">
          BONUS
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
          Included: MyFleet AI Access
        </h2>
        <p className="text-muted-foreground text-lg mb-10">Your intelligent fleet command center</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border"
            >
              <f.icon className="w-8 h-8 text-accent" />
              <span className="text-sm font-medium text-foreground">{f.title}</span>
            </motion.div>
          ))}
        </div>

        <p className="text-lg font-semibold text-foreground">
          PayTap doesn't just process payments.{' '}
          <span className="text-accent">It runs your fleet.</span>
        </p>
      </div>
    </ScrollSection>
  );
};

export default MyFleetBonusSection;
