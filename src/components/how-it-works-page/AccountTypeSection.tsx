import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Building, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollSection from './ScrollSection';

const AccountTypeSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ScrollSection className="pt-16 md:pt-24 pb-6 md:pb-8 px-4 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10">
          Choose Your Account Type
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Individual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/checkout')}
            className="p-6 rounded-2xl bg-card border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-sm cursor-pointer"
          >
            <User className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Individual Account</h3>
            <ul className="text-muted-foreground text-sm space-y-2 text-left">
              <li>→ Instant dashboard access</li>
              <li>→ Start immediately</li>
              <li>→ Perfect for personal vehicles & teams</li>
            </ul>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => navigate('/checkout')}
            className="p-6 rounded-2xl bg-primary text-primary-foreground border-2 border-primary shadow-sm cursor-pointer"
          >
            <Building className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Business / Corporate Account</h3>
            <ul className="text-primary-foreground/80 text-sm space-y-2 text-left">
              <li>→ Dedicated onboarding</li>
              <li>→ Multi-vehicle & team controls</li>
              <li>→ Team management features</li>
            </ul>
          </motion.div>
        </div>

        <p className="text-muted-foreground font-medium">
          Whether you manage 1 or 25+ Vehicle or team, PayTap gets you started instantly - no paperwork, no waiting, no banking friction
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/security')}
            className="group rounded-full px-6"
          >
            Worried about security? Click here
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </ScrollSection>
  );
};

export default AccountTypeSection;
