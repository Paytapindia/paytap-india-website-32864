import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Car, Truck, Package, Bus, Building2 } from 'lucide-react';
import ScrollSection from './ScrollSection';

const audiences = [
{ icon: Car, title: 'Independent Vehicle Owners' },
{ icon: Truck, title: 'Fleet Operators' },
{ icon: Package, title: 'Logistics Businesses' },
{ icon: Bus, title: 'Transport Companies' },
{ icon: Building2, title: 'Corporates Managing Drivers' }];


const AudienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="py-16 md:py-24 px-4 bg-muted/50">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">Built for Anyone Managing 
Vehicles & Teams
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">PayTap is designed for:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
          {audiences.map((a, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border shadow-sm">

              <a.icon className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-foreground text-center">{a.title}</span>
            </motion.div>
          )}
        </div>

        <p className="text-lg font-semibold text-accent">
          If money moves through vehicles or teams, PayTap manages it.
        </p>
      </div>
    </ScrollSection>);

};

export default AudienceSection;