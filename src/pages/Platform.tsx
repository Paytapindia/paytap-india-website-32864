import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Plug, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import UnifiedDashboardAndCapabilities from "@/components/home/UnifiedDashboardAndCapabilities";
import TimeBackAndGovernance from "@/components/home/TimeBackAndGovernance";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

const Platform = () => {
  const { openContactForm } = useModal();

  return (
    <>
      <Helmet>
        <title>Paytap Platform — Connected AI Fleet Operations</title>
        <meta
          name="description"
          content="Explore the Paytap Platform: fleet management, driver management, payments, expenses, GPS, fuel monitoring, AI Manager and ERP integrations."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="bg-paytap-navy text-white pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light">
              Paytap Platform
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
              One connected architecture for every vehicle, driver and rupee.
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Paytap connects fleet operations, driver workflows, vehicle-linked payments, expenses,
              GPS, fuel visibility and AI intelligence in one command centre.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={openContactForm}
                className="bg-paytap-light hover:bg-paytap-light/90 text-white h-11 px-6 rounded-xl"
              >
                Book a Personalised Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white h-11 px-6 rounded-xl"
              >
                <Link to="/ai-fleet-manager">
                  <Sparkles className="mr-2 h-4 w-4 text-paytap-light" />
                  Explore AI Fleet Manager
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <UnifiedDashboardAndCapabilities />

        {/* Integrations Band */}
        <section className="bg-paytap-navy text-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-paytap-light">
                <Plug className="h-4 w-4" /> Integrations &amp; Connectors
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Connect Paytap with your business systems.
              </h2>
              <p className="text-sm sm:text-base text-white/75">
                Supported integrations include Zoho One ERP, AI connectors and Claude-connected
                workflows for enterprise fleet visibility (positioned in Elite).
              </p>
            </div>
            <Button
              onClick={openContactForm}
              className="bg-paytap-light hover:bg-paytap-light/90 text-white h-11 px-6 rounded-xl self-start lg:self-center"
            >
              Discuss Integrations
            </Button>
          </div>
        </section>

        <TimeBackAndGovernance />
        <FooterSection />
      </div>
    </>
  );
};

export default Platform;