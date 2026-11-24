import { Link } from "react-router-dom";
import { ArrowRight, Check, Lock, MessageCircle, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";

const plans = [
  {
    name: "Starter",
    tagline: "For small fleets getting organised",
    featured: false,
    highlights: [
      "Core vehicle & driver records",
      "Vehicle-linked payment visibility",
      "Basic expense & receipt tracking",
    ],
  },
  {
    name: "Beginner",
    tagline: "For growing day-to-day operations",
    featured: false,
    highlights: [
      "Structured fleet & trip management",
      "Spending rules & FASTag visibility",
      "Organised statements & reporting",
    ],
  },
  {
    name: "Professional",
    tagline: "For multi-route commercial fleets",
    featured: false,
    highlights: [
      "Team permissions & approval workflows",
      "Fuel & operational expense tracking",
      "Consolidated multi-vehicle reporting",
    ],
  },
  {
    name: "Elite",
    tagline: "Full AI command centre & connectors",
    featured: true,
    highlights: [
      "Paytap AI Fleet Manager",
      "GPS & geofencing monitoring",
      "Custom dashboards, ERP & AI connectors",
    ],
  },
];

const trustPillars = [
  "RBI-compliant PPI partner payment infrastructure",
  "RuPay network payment instruments & controls",
  "Role-based access & permissioned workflows",
  "Structured data management & activity records",
  "Human-approved financial & operational controls",
  "Supported ERP & business tool integrations",
];

const evolution = [
  { stage: "Foundation", text: "Fleet payments and financial control built for Indian commercial operators." },
  { stage: "Expansion", text: "Connected fleet management across vehicles, drivers, GPS, fuel and expenses." },
  { stage: "Vision", text: "AI-powered fleet and business intelligence — with AI Business Manager in active development." },
];

const PlansTrustAndConversion = () => {
  const { openContactForm } = useModal();

  return (
    <>
      {/* SECTION 13 — PLANS THAT GROW WITH YOUR FLEET */}
      <section id="plans" className="bg-paytap-gray py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              Plans That Grow With Your Fleet
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy">
              Choose the control your business needs.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              AI Fleet Manager, GPS monitoring, custom dashboards and connectors are positioned in
              the Elite plan. Request a personalised demo for tailored fleet pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 flex flex-col justify-between gap-6 ${
                  plan.featured
                    ? "border-paytap-light bg-paytap-navy text-white shadow-xl"
                    : "border-border bg-white text-paytap-navy"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-paytap-light px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        <Sparkles className="h-3 w-3" /> AI Included
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      plan.featured ? "text-white/75" : "text-muted-foreground"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {plan.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="h-4 w-4 text-paytap-light shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={openContactForm}
                  className={
                    plan.featured
                      ? "w-full bg-paytap-light hover:bg-paytap-light/90 text-white"
                      : "w-full bg-paytap-navy hover:bg-paytap-navy/90 text-white"
                  }
                >
                  Request Pricing &amp; Demo
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14 & 16 — TRUST & CREDIBILITY + ABOUT PAYTAP */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Trust */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light">
                Trust &amp; Credibility
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paytap-navy">
                Built around visibility, control and accountability.
              </h2>
              <Link
                to="/security"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-paytap-light hover:underline pt-2"
              >
                Explore Trust &amp; Security <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {trustPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-start gap-3 rounded-xl border border-border bg-paytap-gray/40 p-4 text-sm font-medium text-paytap-navy"
                >
                  <Lock className="h-4 w-4 text-paytap-light shrink-0 mt-0.5" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Evolution */}
          <div className="rounded-2xl border border-border bg-paytap-gray/50 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-2">
                  About Paytap
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-paytap-navy">
                  Building the intelligence and control layer for fleet-driven businesses.
                </h3>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-paytap-navy hover:text-paytap-light"
              >
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {evolution.map((e, idx) => (
                <div key={e.stage} className="rounded-xl bg-white border border-border p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-paytap-light">
                    0{idx + 1} · {e.stage}
                  </div>
                  <p className="text-sm text-paytap-navy/85 leading-relaxed">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17 — FINAL CONVERSION */}
      <section className="relative overflow-hidden bg-paytap-navy text-white py-20 lg:py-28">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
            <Shield className="h-3.5 w-3.5 text-paytap-light" />
            Paytap — One Intelligent Command Centre
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Your fleet deserves an intelligent way to operate.
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            From a few vehicles to a growing fleet, experience a more connected way to manage your
            business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <Button
              size="lg"
              onClick={openContactForm}
              className="bg-paytap-light hover:bg-paytap-light/90 text-white font-semibold px-8 h-12 rounded-xl"
            >
              Book a Personalised Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white h-12 px-7 rounded-xl"
            >
              <Link to="/ai-fleet-manager">Explore Paytap Intelligence</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-white/85 hover:text-white hover:bg-white/10 h-12 px-5 rounded-xl"
            >
              <a
                href="https://wa.me/919900010964"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-paytap-light" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlansTrustAndConversion;