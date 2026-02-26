import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ShieldCheck, Bell, Power, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { RBIIcon } from '@/components/icons/RBIIcon';
import { NPCIIcon } from '@/components/icons/NPCIIcon';

/* ───────── Hero ───────── */
const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-[#021a42] overflow-hidden px-4">
      {/* NFC wave glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full border-2 border-[#f6245b]/20"
        animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full border-2 border-[#f6245b]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute w-[160px] h-[160px] rounded-full bg-[#f6245b]/10"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          Security Built for Vehicles.
          <br />
          <span className="text-[#f6245b]">Control Built for Owners.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto"
        >
          Bank-grade infrastructure.<br />
          Physical tap-only payments.<br />
          Full owner control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-[#f6245b] hover:bg-[#f6245b]/90 text-white rounded-full px-8"
            onClick={() => document.getElementById('security-cards')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────── Core Security Cards ───────── */
const securityCards = [
  { icon: Smartphone, title: 'Physical Tap Only', desc: 'NFC works only within 2–4 cm.' },
  { icon: ShieldCheck, title: 'Registered POS Required', desc: 'Transactions require authorized merchant machines.' },
  { icon: Bell, title: 'Instant Owner Alerts', desc: 'Every tap triggers real-time notification.' },
  { icon: Power, title: 'On / Off Control', desc: 'Turn payment tag ON or OFF anytime.' },
];

const CoreSecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="security-cards" className="py-20 md:py-28 px-4 bg-[#021a42]">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <card.icon className="w-10 h-10 text-[#f6245b] mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-white/60 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────── Snake Flow ───────── */
const snakeSteps = [
  {
    title: 'Business Onboards',
    bullets: ['KYC submitted', 'Compliance verified', 'QAC processed'],
  },
  {
    title: 'Secure Account Created',
    bullets: ['Dedicated operational account', 'Not linked to primary bank', 'Spending isolated from core finances'],
  },
  {
    title: 'Dashboard Activated',
    bullets: ['Add vehicles', 'Set limits', 'Assign tag'],
  },
  {
    title: 'Tag Installed',
    bullets: ['Windshield (recommended)', 'Dashboard', 'Glove box', 'Keychain'],
  },
  {
    title: 'Controlled Spending',
    bullets: ['Merchant category restriction', 'Daily/monthly limits', 'Fuel-only mode'],
  },
  {
    title: 'Real-Time Protection',
    bullets: ['Instant notification', 'Live dashboard update', 'Instant freeze if needed'],
  },
];

const SnakeFlowSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <section className="py-20 md:py-28 px-4 bg-[#021a42]">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          How Paytap Protects Every Vehicle
        </h2>
      </div>

      <div ref={containerRef} className="relative max-w-2xl mx-auto">
        {/* Animated vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
          <motion.div
            className="w-full bg-[#f6245b] origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-12">
          {snakeSteps.map((step, i) => {
            const StepCard = () => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, amount: 0.3 });
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative pl-14 md:pl-0 md:w-[45%]"
                  style={{ marginLeft: i % 2 === 0 ? '0' : 'auto' }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-auto md:right-auto top-4 w-4 h-4 rounded-full bg-[#f6245b] border-2 border-[#021a42]"
                    style={{
                      [i % 2 === 0 ? 'right' : 'left']: 'auto',
                      ...(typeof window !== 'undefined' && window.innerWidth >= 768
                        ? { [i % 2 === 0 ? 'right' : 'left']: '-2rem' }
                        : {}),
                    }}
                  />
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                    <span className="text-[#f6245b] text-xs font-bold uppercase tracking-wider">
                      Step {i + 1}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 mb-3">{step.title}</h3>
                    <ul className="space-y-1">
                      {step.bullets.map((b) => (
                        <li key={b} className="text-white/60 text-sm flex items-start gap-2">
                          <span className="text-[#f6245b] mt-0.5">→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            };
            return <StepCard key={step.title} />;
          })}
        </div>

        {/* Final bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#f6245b] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-full">
            No Cash. No Blind Spending. Full Control.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────── What-If Accordion ───────── */
const whatIfItems = [
  {
    q: 'What if someone taps the car while parked?',
    a: [
      'NFC requires 2–4 cm physical contact',
      'Requires active registered POS',
      'Owner receives instant alert',
      'Tag can be disabled anytime',
    ],
  },
  {
    q: 'What if the tag is stolen?',
    a: [
      'Instant freeze from dashboard',
      'Spending limits cap exposure',
      'Merchant restrictions apply',
      'Main bank account remains insulated',
    ],
  },
  {
    q: 'Can it be remotely hacked?',
    a: [
      'No QR scanning',
      'No Bluetooth pairing',
      'No remote activation',
      'Works only via secure NFC + RuPay rails',
    ],
  },
];

const WhatIfSection = () => (
  <section className="py-20 md:py-28 px-4 bg-[#021a42]">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
        What If...?
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {whatIfItems.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm px-6"
          >
            <AccordionTrigger className="text-white font-semibold text-left hover:no-underline py-5">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5">
              <ul className="space-y-2">
                {item.a.map((point) => (
                  <li key={point} className="text-white/60 text-sm flex items-start gap-2">
                    <span className="text-[#f6245b] mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

/* ───────── Trust ───────── */
const TrustSection = () => (
  <section className="py-16 px-4 bg-[#021a42] border-t border-white/5">
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex items-center justify-center gap-6 mb-4">
        <RBIIcon size={48} />
        <NPCIIcon size={48} />
      </div>
      <p className="text-white/50 text-sm">
        Paytap operates on RuPay payment infrastructure governed by<br />
        National Payments Corporation of India (NPCI).
      </p>
    </div>
  </section>
);

/* ───────── Closing CTA ───────── */
const ClosingCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 px-4 bg-[#021a42]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
        >
          Your Fleet.<br />
          Your Rules.<br />
          <span className="text-[#f6245b]">Your Money.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/60 text-lg mb-10 max-w-md mx-auto"
        >
          Safer than cash.<br />
          Smarter than reimbursement.<br />
          Built for modern fleet control.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="bg-[#f6245b] hover:bg-[#f6245b]/90 text-white rounded-full px-10 text-lg"
            onClick={() => navigate('/checkout')}
          >
            Activate Your Fleet
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ───────── Page ───────── */
const Security = () => {
  return (
    <>
      <Helmet>
        <title>Security & System | Paytap</title>
        <meta
          name="description"
          content="Bank-grade security for vehicle payments. Physical NFC tap-only, instant alerts, full owner control. See how Paytap protects every vehicle."
        />
        <link rel="canonical" href="https://paytap.co.in/security" />
      </Helmet>

      <div className="min-h-screen bg-[#021a42]">
        <Navbar />
        <main>
          <HeroSection />
          <CoreSecuritySection />
          <SnakeFlowSection />
          <WhatIfSection />
          <TrustSection />
          <ClosingCTA />
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default Security;
