import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Package, Truck, Warehouse, Car, Factory } from "lucide-react";

const stages = [
  { num: "01", name: "Connect", desc: "Connect supported fleet, driver, payment and business information." },
  { num: "02", name: "Capture", desc: "Capture relevant activity, transactions and documents." },
  { num: "03", name: "Organise", desc: "Structure the information around the business, vehicles and drivers." },
  { num: "04", name: "Understand", desc: "Use supported AI capabilities to interpret information and surface insights." },
  { num: "05", name: "Decide", desc: "Give the owner a controlled way to review, approve and manage supported actions." },
];

const fleetScales = [
  {
    id: "small",
    label: "Small Fleet",
    size: "5 Vehicles",
    title: "Individual vehicle, driver and expense visibility",
    points: [
      "Single-screen view of every vehicle and driver",
      "Vehicle-linked fuel and toll spending controls",
      "Digital receipts without spreadsheet chasing",
    ],
  },
  {
    id: "growing",
    label: "Growing Fleet",
    size: "50 Vehicles",
    title: "Consolidated vehicle management and team-level operations",
    points: [
      "Multi-route visibility across hubs and supervisors",
      "Structured expense categorisation and approvals",
      "GPS boundaries and fuel anomaly review",
    ],
  },
  {
    id: "large",
    label: "Large Fleet",
    size: "500+ Vehicles",
    title: "Centralised visibility, multiple teams and enterprise controls",
    points: [
      "Role-based access across regions and finance teams",
      "AI Manager intelligence and custom dashboards (Elite)",
      "ERP and AI connector integrations including Zoho One",
    ],
  },
];

const industries = [
  { icon: Truck, name: "Transport & Logistics", desc: "Long-haul and regional fleets managing fuel, tolls, driver settlements and route visibility." },
  { icon: Package, name: "Last-Mile Delivery", desc: "High-frequency urban fleets needing tight expense control and daily vehicle accountability." },
  { icon: Building2, name: "Distribution", desc: "Multi-stop supply networks coordinating drivers, trips and recurring operational spend." },
  { icon: Warehouse, name: "Warehousing", desc: "Hub-to-hub vehicle operations linking dispatch activity with structured cost tracking." },
  { icon: Car, name: "Commercial Vehicle Fleets", desc: "Service, utility and commercial vehicles managed with clear driver and spend rules." },
  { icon: Factory, name: "Enterprise Fleet Operations", desc: "Multi-entity organisations requiring centralised governance, reporting and ERP integrations." },
];

const HowIntelligenceAndScale = () => {
  const [scaleId, setScaleId] = useState("growing");
  const activeScale = fleetScales.find((s) => s.id === scaleId) ?? fleetScales[1];

  return (
    <>
      {/* SECTION 08 — HOW PAYTAP INTELLIGENCE WORKS */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              How Paytap Intelligence Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy">
              From activity to intelligence. From intelligence to control.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className="rounded-2xl border border-border bg-paytap-gray/50 p-6 flex flex-col justify-between gap-4"
              >
                <span className="text-xs font-bold text-paytap-light">{stage.num}</span>
                <div>
                  <h3 className="text-lg font-bold text-paytap-navy mb-2">{stage.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 09 — FROM 5 VEHICLES TO 500+ */}
      <section className="bg-paytap-navy text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
                Built to Scale
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Small fleet. Big fleet. One command centre.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/75">
                Whether you manage a handful of vehicles or a much larger fleet, Paytap brings
                operational information into one connected management environment.
              </p>
            </div>

            <div className="inline-flex rounded-xl bg-white/10 p-1 self-start">
              {fleetScales.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScaleId(s.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                    scaleId === s.id ? "bg-paytap-light text-white" : "text-white/75 hover:text-white"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-paytap-light">
                {activeScale.label} — Illustrative Scale
              </span>
              <div className="text-4xl sm:text-5xl font-bold">{activeScale.size}</div>
              <p className="text-base text-white/80 pt-1">{activeScale.title}</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-3">
              {activeScale.points.map((pt) => (
                <div
                  key={pt}
                  className="rounded-xl border border-white/10 bg-paytap-navy/80 px-5 py-4 text-sm text-white/90"
                >
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — INDUSTRY SOLUTIONS */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
                Industry Solutions
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paytap-navy">
                Built for businesses that keep the world moving.
              </h2>
            </div>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-paytap-light hover:underline"
            >
              Explore all solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="rounded-2xl border border-border bg-paytap-gray/40 p-6 space-y-3 hover:border-paytap-navy/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-paytap-navy text-white">
                  <ind.icon className="h-5 w-5 text-paytap-light" />
                </div>
                <h3 className="text-lg font-bold text-paytap-navy">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowIntelligenceAndScale;