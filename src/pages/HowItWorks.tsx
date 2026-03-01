import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ChevronDown, X, Check, Shield, Lock, ToggleRight, CreditCard, Fingerprint,
  UserPlus, Car, Wallet, SlidersHorizontal, Zap, Smile, ArrowRight, Phone
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Button } from '@/components/ui/button';
import { useModal } from '@/contexts/ModalContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const }
  })
};

const HowItWorks = () => {
  const navigate = useNavigate();
  const { openContactForm } = useModal();
  const flowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: flowRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  const scrollToContent = () => {
    document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const chaosItems = [
    "Drivers call you for fuel money",
    "Toll payments via cash or FASTag chaos",
    "Service bills on WhatsApp screenshots",
    "No idea who spent what, when, where",
    "End-of-month reconciliation nightmares"
  ];

  const controlItems = [
    "Tap-to-Pay NFC vehicle tags",
    "Works online + offline everywhere",
    "Central owner dashboard",
    "Employee access control",
    "Vehicle-wise real-time tracking"
  ];

  const securityItems = [
    { icon: Shield, text: "No random tap payments" },
    { icon: CreditCard, text: "Person-to-Merchant only" },
    { icon: Lock, text: "Powered by secure RuPay network" },
    { icon: ToggleRight, text: "Turn tag ON/OFF anytime" },
    { icon: Fingerprint, text: "PIN required above ₹5,000" }
  ];

  const steps = [
    { icon: UserPlus, label: "Create Account" },
    { icon: Car, label: "Assign Vehicles" },
    { icon: Wallet, label: "Load Balance" },
    { icon: SlidersHorizontal, label: "Set Limits" },
    { icon: Zap, label: "Vehicle Pays" },
    { icon: Smile, label: "You Relax" }
  ];

  const plans = [
    {
      name: "Personal",
      features: ["Up to 5 vehicles", "₹1,000 activation", "1 tag included", "₹999/year"],
      highlighted: false
    },
    {
      name: "Business",
      features: ["Up to 20 vehicles", "₹1,000 activation", "1 tag included", "₹1,999/year"],
      highlighted: true
    },
    {
      name: "Corporate",
      features: ["Unlimited vehicles", "₹4,999 activation", "Central dashboard", "Enterprise controls"],
      highlighted: false
    }
  ];

  const kycLimits = [
    { label: "Min KYC", value: "₹10,000/month" },
    { label: "Full KYC", value: "₹2,00,000/month" },
    { label: "Corporate", value: "No overall limit" }
  ];

  return (
    <>
      <Helmet>
        <title>How PayTap Works | Vehicle Payment Control</title>
        <meta name="description" content="Stop giving drivers cash. PayTap gives vehicle owners complete payment control with NFC tags, prepaid cards, spending limits, and real-time tracking." />
        <link rel="canonical" href="https://paytap.co.in/how-it-works" />
      </Helmet>

      <div className="min-h-screen bg-[#021a42]">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          {/* NFC glow rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-[#f6245b]/20"
              style={{ width: 200 + i * 140, height: 200 + i * 140 }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Your Vehicle Can Now{' '}
              <span className="text-[#f6245b]">Pay on Its Own.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
            >
              One dashboard. Full control. Real-time visibility.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button onClick={() => navigate('/checkout')} className="bg-[#f6245b] hover:bg-[#f6245b]/90 text-white rounded-full px-8 py-6 text-lg font-semibold">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={scrollToContent} className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                See How It Works
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/40" />
          </motion.div>
        </section>

        {/* ── PROBLEM ── */}
        <section id="problem-section" className="py-24 md:py-32 px-4">
          <div className="max-w-3xl mx-auto">
            {["It starts with one vehicle.", "Then five.", "Then confusion."].map((line, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                custom={i}
                className={`text-2xl md:text-4xl font-bold mb-4 ${i === 2 ? 'text-[#f6245b]' : 'text-white'}`}
              >
                {line}
              </motion.p>
            ))}

            <div className="mt-12 space-y-4">
              {[
                "Drivers call you for fuel money",
                "Another calls for toll",
                "Another for a service payment",
                "Approvals happen on WhatsApp",
                "You still don't know who spent what"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#f6245b] mt-3 shrink-0" />
                  <p className="text-white/70 text-lg md:text-xl">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="mt-12 text-xl md:text-2xl font-bold text-[#f6245b]"
            >
              If you don't control vehicle spend, it controls your business.
            </motion.p>
          </div>
        </section>

        {/* ── SOLUTION ── */}
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white text-center mb-16"
            >
              What if all that chaos became{' '}
              <span className="text-[#f6245b]">one clean dashboard?</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Chaos */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h3 className="text-xl font-semibold text-red-400 mb-6">Without PayTap</h3>
                <div className="space-y-4">
                  {chaosItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Control */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                className="bg-white/5 backdrop-blur-sm border border-[#f6245b]/20 rounded-2xl p-8"
              >
                <h3 className="text-xl font-semibold text-green-400 mb-6">With PayTap</h3>
                <div className="space-y-4">
                  {controlItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center text-white/60 text-lg mt-12 max-w-2xl mx-auto"
            >
              PayTap turns vehicle expenses into a system — not a struggle.
            </motion.p>
          </div>
        </section>

        {/* ── SECURITY ── */}
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-16"
            >
              Built Like a Bank.{' '}
              <span className="text-[#f6245b]">Designed for Vehicles.</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {securityItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3"
                >
                  <item.icon className="w-8 h-8 text-[#f6245b]" />
                  <span className="text-white/80 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mt-12 text-white/60 text-lg"
            >
              Your vehicle isn't just moving. It's transacting.
            </motion.p>
          </div>
        </section>

        {/* ── HOW IT WORKS FLOW ── */}
        <section className="py-24 md:py-32 px-4 overflow-hidden" ref={flowRef}>
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white text-center mb-20"
            >
              How It Works
            </motion.h2>

            {/* Desktop horizontal flow */}
            <div className="hidden md:block relative">
              {/* Connector line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-white/10">
                <motion.div className="h-full bg-[#f6245b] origin-left" style={{ width: lineWidth }} />
              </div>

              <div className="grid grid-cols-6 gap-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative z-10">
                      <step.icon className="w-10 h-10 text-[#f6245b]" />
                    </div>
                    <span className="text-white font-medium text-sm">{step.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile vertical flow */}
            <div className="md:hidden space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-7 h-7 text-[#f6245b]" />
                  </div>
                  <span className="text-white font-medium">{step.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-center text-white/60 text-lg mt-16"
            >
              One connected ecosystem. Zero manual work.
            </motion.p>
          </div>
        </section>

        {/* ── ACCOUNT TYPES ── */}
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white text-center mb-16"
            >
              Choose Your Plan
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  whileHover={{ y: -8 }}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 flex flex-col border transition-shadow duration-300 ${
                    plan.highlighted
                      ? 'border-[#f6245b]/40 shadow-[0_0_30px_rgba(246,36,91,0.15)]'
                      : 'border-white/10 hover:shadow-[0_0_20px_rgba(246,36,91,0.1)]'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="text-xs font-semibold text-[#f6245b] uppercase tracking-wider mb-2">Most Popular</span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-6">{plan.name}</h3>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-white/70">
                        <Check className="w-4 h-4 text-[#f6245b] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate('/checkout')}
                    className={`mt-8 rounded-full w-full py-5 font-semibold ${
                      plan.highlighted
                        ? 'bg-[#f6245b] hover:bg-[#f6245b]/90 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KYC LIMITS ── */}
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              KYC Spending Limits
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {kycLimits.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center"
                >
                  <p className="text-white/50 text-sm uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden">
          {/* Gradient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[600px] h-[600px] rounded-full bg-[#f6245b]/10 blur-[120px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-8"
            >
              Ready to Let Your Vehicle{' '}
              <span className="text-[#f6245b]">Pay for Itself?</span>
            </motion.h2>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button onClick={() => navigate('/checkout')} className="bg-[#f6245b] hover:bg-[#f6245b]/90 text-white rounded-full px-8 py-6 text-lg font-semibold">
                Activate Account <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => openContactForm()} className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg">
                <Phone className="mr-2 w-5 h-5" /> Talk to Sales
              </Button>
            </motion.div>
          </div>
        </section>

        <FooterSection />
      </div>
    </>
  );
};

export default HowItWorks;
