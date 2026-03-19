import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useCallback } from "react";
import { Zap, Shield, MapPin, Coffee, Eye, Layers, Wifi, Briefcase, Wallet, Smartphone, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

// Hook for intersection observer fade-in
function useInView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Paytap — Reimagining Financial Infrastructure for India</title>
        <meta name="description" content="Paytap is a fintech infrastructure company building payment control and management systems for vehicle-led and enterprise ecosystems across India." />
        <link rel="canonical" href="https://paytap.co.in/about" />
      </Helmet>

      <Navbar />

      {/* ─── Hero ─── */}
      <section className="bg-primary text-primary-foreground py-20 md:py-40 px-6 relative overflow-hidden">
        <div className="max-w-[1080px] mx-auto text-center relative z-10">
          <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/50 mb-6">
            About Paytap
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-tight max-w-4xl mx-auto mb-8">
            Reimagining Financial Infrastructure for India
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Building payment control and management systems for mobility-led and enterprise ecosystems across the country.
          </p>
        </div>
        {/* Subtle bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── Why We Exist ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Why We Exist</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8 max-w-3xl">
            Access has scaled. Control hasn't.
          </h2>
          <div className="space-y-6 max-w-3xl">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              India has built some of the world's most powerful digital payment rails — from real-time payments to open financial infrastructure. But for high-frequency, mobility-led, and operational environments, financial control, transparency, and experience remain fragmented.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Paytap exists to bridge this gap by providing a financial layer that works reliably in both connected and low-connectivity environments. Our infrastructure enables payments without complex app flows, PIN dependencies, or manual reconciliation — allowing organizations and individuals to move money with clarity, speed, and operational confidence.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── What We Power ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">What We Power</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 max-w-3xl">
            A versatile payment layer for consumer and enterprise environments
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            While Paytap is designed around vehicle and mobility use cases, our platform is built as a versatile payment and transaction management layer.
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-14">
            {[
              {
                icon: Zap,
                title: "Mobility & Transport",
                items: ["Fuel stations", "Toll systems (FASTag-linked)", "Metro & transit networks (NCMC compatible)"],
              },
              {
                icon: MapPin,
                title: "Parking & Urban Services",
                items: ["Parking operators", "Service centers", "Public utility access points"],
              },
              {
                icon: Coffee,
                title: "Retail & Merchant Networks",
                items: ["Cafés & restaurants", "Retail stores", "All RuPay-enabled acceptance points"],
              },
            ].map(({ icon: Icon, title, items }) => (
              <div key={title} className="pt-6 border-t-2 border-accent">
                <Icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-lg md:text-xl font-semibold text-foreground">
            Access to over <span className="text-accent">8 lakh+</span> RuPay POS terminals across India
          </p>
        </div>
      </AnimatedSection>

      {/* ─── Our Platform ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Our Platform</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 max-w-3xl">
            Payment acceptance meets financial governance
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Paytap combines payment acceptance with financial management and governance capabilities.
          </p>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                icon: Wallet,
                title: "Prepaid & PPI Infrastructure",
                desc: "RBI-compliant prepaid instruments for controlled spend and regulated payment flows.",
              },
              {
                icon: Smartphone,
                title: "Contactless NFC Payments",
                desc: "App-free, tap-and-pay access for fast, reliable transactions across physical environments.",
              },
              {
                icon: Eye,
                title: "Transaction Visibility & Controls",
                desc: "Real-time monitoring, spend governance, and operational oversight for businesses and fleet operators.",
              },
              {
                icon: TrendingUp,
                title: "Embedded Financial Services",
                desc: "Vehicle-centric credit enablement, insurance integrations, and transaction intelligence.",
                badge: "In Development",
              },
            ].map(({ icon: Icon, title, desc, badge: badgeText }) => (
              <div key={title} className="flex gap-4">
                <Icon className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                    {title}
                    {badgeText && (
                      <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0.5">
                        {badgeText}
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Our Story ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-[1080px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50 mb-4">Our Story</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-10">
            Built by operators. Designed for scale.
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-primary-foreground/70 leading-relaxed">
              Paytap is India's fintech infrastructure layer for mobility, fleets, and business payments — giving you real-time control, visibility, and automation over how money flows across vehicles, teams, and daily operations.
            </p>
            <p className="text-base md:text-lg text-primary-foreground/70 leading-relaxed">
              Paytap is a product of DriveTap Innovation India Pvt. Ltd., in association with RBI-authorized PPI partners.
            </p>
            <p className="text-base md:text-lg text-primary-foreground/70 leading-relaxed">
              The company is built by technologists and fintech operators with over a decade of experience in digital payments, mobility systems, and enterprise infrastructure — spanning prepaid platforms, logistics automation, and transaction technology.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── What Makes Paytap Different ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6">
        <div className="max-w-[1080px] mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">What Sets Us Apart</p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-12 max-w-3xl">
            Infrastructure-grade. Not just another payment app.
          </h2>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                icon: Shield,
                title: "RBI-Compliant Infrastructure",
                desc: "Built in partnership with RBI-authorized PPI partners, ensuring regulated, secure, and auditable financial operations.",
              },
              {
                icon: Briefcase,
                title: "Enterprise-Ready & Scalable",
                desc: "Designed for high-volume, distributed environments — from fuel networks and transit systems to enterprise fleets and merchant ecosystems.",
              },
              {
                icon: Layers,
                title: "Unified Payment & Control Layer",
                desc: "Combines acceptance, visibility, and governance into a single platform — not just a payment tool.",
              },
              {
                icon: Wifi,
                title: "Works Online & Offline",
                desc: "Built for real-world conditions where connectivity and operational simplicity matter as much as speed.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border-l-[3px] border-accent pl-6">
                <h3 className="text-base font-bold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Vision ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6">
        <div className="max-w-[1080px] mx-auto text-center">
          <div className="border-t border-border" />
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed max-w-4xl mx-auto py-16 md:py-20 italic">
            "To build India's trusted financial backbone for mobility and enterprise ecosystems — transforming payments into systems of control, transparency, and operational intelligence."
          </p>
          <div className="border-b border-border" />
        </div>
      </AnimatedSection>

      {/* ─── Company Information ─── */}
      <AnimatedSection className="py-16 md:py-24 px-6 bg-secondary">
        <div className="max-w-[1080px] mx-auto">
          <div className="border-t border-border pt-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6">Legal Information</p>
                <div className="space-y-2 text-sm text-foreground">
                  <p><span className="text-muted-foreground">Legal Name:</span> DriveTap Innovation India Pvt. Ltd.</p>
                  <p><span className="text-muted-foreground">Trade Name:</span> Paytap</p>
                  <p><span className="text-muted-foreground">GSTIN:</span> 29AALCD4626M1Z3</p>
                  <p><span className="text-muted-foreground">In Association with</span> RBI Authorised PPI Partners</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6">Registered Office</p>
                <div className="text-sm text-foreground leading-relaxed">
                  <p>Level 14 & 15, Concorde Towers</p>
                  <p>1 Vittal Mallya Road, UB City</p>
                  <p>Bengaluru – 560001</p>
                  <p>Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Final CTA ─── */}
      <AnimatedSection className="py-20 md:py-32 px-6">
        <div className="max-w-[1080px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Build on Paytap?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join businesses and operators across India who are adopting Paytap as their payment and transaction management layer.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-10">
              Get Started
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      <FooterSection />
    </>
  );
};

export default About;
