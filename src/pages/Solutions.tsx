import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import HowIntelligenceAndScale from "@/components/home/HowIntelligenceAndScale";
import PlansTrustAndConversion from "@/components/home/PlansTrustAndConversion";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

const Solutions = () => {
  const { openContactForm } = useModal();

  return (
    <>
      <Helmet>
        <title>Paytap Fleet Solutions — Logistics, Delivery &amp; Enterprise</title>
        <meta
          name="description"
          content="Fleet operations solutions for transport and logistics, last-mile delivery, distribution, warehousing, commercial fleets and enterprise operations."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="bg-paytap-navy text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light">
              Industry &amp; Scale Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
              Built for businesses that keep the world moving.
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Whether you operate 5 commercial vehicles or 500+ across multiple hubs, Paytap adapts
              to your operational structure.
            </p>
            <Button
              onClick={openContactForm}
              className="bg-paytap-light hover:bg-paytap-light/90 text-white h-11 px-6 rounded-xl"
            >
              Book a Personalised Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <HowIntelligenceAndScale />
        <PlansTrustAndConversion />
        <FooterSection />
      </div>
    </>
  );
};

export default Solutions;