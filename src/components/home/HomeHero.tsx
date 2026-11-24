import { ArrowRight, Sparkles, Truck, Users, Wallet, MapPin, Fuel, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

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

          {/* Right: Live-Styled Command Centre & AI Manager Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-4 sm:p-5 shadow-2xl">
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-paytap-light" />
                  <span className="text-xs font-semibold tracking-wide text-white/90">
                    Paytap Command Centre
                  </span>
                </div>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/75">
                  Illustrative Preview
                </span>
              </div>

              {/* Top Operational Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                {[
                  { icon: Truck, label: "Fleet", value: "24 Active", sub: "3 Alerts" },
                  { icon: Users, label: "Drivers", value: "22 On Duty", sub: "Verified" },
                  { icon: Wallet, label: "Payments", value: "Linked", sub: "Rules Active" },
                  { icon: Fuel, label: "Fuel & GPS", value: "Monitored", sub: "Synced" },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="rounded-xl border border-white/10 bg-paytap-navy/80 p-3"
                  >
                    <node.icon className="h-4 w-4 text-paytap-light mb-1.5" />
                    <div className="text-[11px] text-white/60">{node.label}</div>
                    <div className="text-sm font-semibold text-white">{node.value}</div>
                    <div className="text-[10px] text-white/50">{node.sub}</div>
                  </div>
                ))}
              </div>

              {/* Connected AI Manager Panel */}
              <div className="rounded-xl border border-paytap-light/35 bg-gradient-to-br from-white/10 to-white/[0.03] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-paytap-light/20 text-paytap-light">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Paytap AI Manager</div>
                      <div className="text-[11px] text-white/60">Available in Elite plan</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/80">
                    <Shield className="h-3 w-3 text-paytap-light" />
                    Approval Required
                  </span>
                </div>

                <div className="rounded-lg bg-paytap-navy/90 border border-white/10 p-3 text-xs space-y-2">
                  <div className="text-white/60">Owner command:</div>
                  <div className="font-medium text-white">
                    &ldquo;Show me vehicles with unusual fuel expenses today.&rdquo;
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-medium text-white">3 vehicles flagged for review</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-paytap-light">
                      <MapPin className="h-3 w-3" /> Route &amp; receipt linked
                    </span>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    Transactions compared against vehicle spend limits and recent trip activity.
                    Ready for owner review before any limit change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;