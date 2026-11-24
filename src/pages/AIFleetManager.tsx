import { Helmet } from "react-helmet-async";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import IntelligenceAndAIDemo from "@/components/home/IntelligenceAndAIDemo";
import TimeBackAndGovernance from "@/components/home/TimeBackAndGovernance";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

const AIFleetManager = () => {
  const { openContactForm } = useModal();

  return (
    <>
      <Helmet>
        <title>Paytap AI Fleet Manager — Ask Your Fleet, Control Your Business</title>
        <meta
          name="description"
          content="Experience Paytap AI Fleet Manager (available in Elite) and learn about our roadmap for AI Business Manager."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="bg-paytap-navy text-white pt-28 pb-12 lg:pt-36 lg:pb-16 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-paytap-light" />
              Available in Elite Plan
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
              Paytap AI Fleet Manager.
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Ask about fleet status, review unusual fuel expenses, inspect driver and payment
              activity, and approve recommended controls — all from one intelligent interface.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                onClick={openContactForm}
                className="bg-paytap-light hover:bg-paytap-light/90 text-white h-11 px-6 rounded-xl"
              >
                Book an AI Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/65">
                <Clock className="h-3.5 w-3.5 text-paytap-light" />
                AI Business Manager is currently in active development
              </span>
            </div>
          </div>
        </section>

        <IntelligenceAndAIDemo />
        <TimeBackAndGovernance />
        <FooterSection />
      </div>
    </>
  );
};

export default AIFleetManager;