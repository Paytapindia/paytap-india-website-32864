import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import CommandCentreDemo from "./CommandCentreDemo";

const HomeHero = () => {
  const { openContactForm } = useModal();

  const scrollToExplore = () => {
    const el = document.getElementById("intelligence-layer");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-paytap-navy text-white pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Subtle Paytap Intelligence Network Background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        aria-hidden="true"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="heroGlow" cx="72%" cy="42%" r="48%">
            <stop offset="0%" stopColor="#F6245B" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#021A42" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="800" fill="url(#heroGlow)" />
        <g stroke="#EAF0F8" strokeOpacity="0.18" strokeWidth="1">
          <line x1="120" y1="160" x2="480" y2="290" />
          <line x1="480" y1="290" x2="860" y2="180" />
          <line x1="860" y1="180" x2="1240" y2="340" />
          <line x1="480" y1="290" x2="720" y2="560" />
          <line x1="720" y1="560" x2="1240" y2="340" />
          <line x1="260" y1="620" x2="720" y2="560" />
        </g>
        <g fill="#F6245B" fillOpacity="0.65">
          <circle cx="120" cy="160" r="3" />
          <circle cx="480" cy="290" r="4" />
          <circle cx="860" cy="180" r="3.5" />
          <circle cx="1240" cy="340" r="4" />
          <circle cx="720" cy="560" r="3.5" />
          <circle cx="260" cy="620" r="3" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Positioning & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase text-paytap-gray">
              <span className="h-2 w-2 rounded-full bg-paytap-light animate-pulse" />
              AI-Powered Fleet Operations Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08]">
              Your Fleet. One Intelligent Command Centre.
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-paytap-light">
              Run your entire fleet with AI.
            </p>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              From vehicles and drivers to payments, fuel, GPS and expenses, Paytap brings your
              entire fleet operation into one connected platform — powered by AI built to help you
              understand, manage and grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Button
                size="lg"
                onClick={openContactForm}
                className="bg-paytap-light hover:bg-paytap-light/90 text-white font-semibold px-7 h-12 rounded-xl"
              >
                Book a Personalised Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToExplore}
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white font-medium px-7 h-12 rounded-xl"
              >
                Explore Paytap
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-paytap-light" />
                Vehicles, Drivers &amp; Trips
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-paytap-light" />
                Payments, FASTag &amp; Expenses
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-paytap-light" />
                AI Manager (Elite)
              </span>
            </div>
          </div>

          {/* Right: Live, Story-Driven Command Centre Demo */}
          <div className="lg:col-span-6">
            <CommandCentreDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;