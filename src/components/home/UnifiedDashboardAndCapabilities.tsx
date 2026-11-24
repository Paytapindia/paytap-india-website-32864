import { useState } from "react";
import {
  Truck,
  Users,
  MapPin,
  Fuel,
  Wallet,
  Receipt,
  Sparkles,
  Plug,
  BarChart3,
  FileText,
  ShieldAlert,
  Route,
} from "lucide-react";

const hotspots = [
  { id: "payments", side: "left", icon: Wallet, label: "Payments", title: "Vehicle-Linked Payments", detail: "Manage prepaid instruments, wallets and vehicle-level spending controls from one screen." },
  { id: "expenses", side: "left", icon: Receipt, label: "Expenses", title: "Organised Fleet Expenses", detail: "Track every operational spend against the exact vehicle, driver and trip." },
  { id: "fastag", side: "left", icon: Route, label: "FASTag", title: "FASTag & Toll Visibility", detail: "Monitor highway toll deductions alongside route and trip logs." },
  { id: "bills", side: "left", icon: FileText, label: "Bills & Receipts", title: "Digital Bills & Receipts", detail: "Capture and store bills and receipts centrally for faster reconciliation." },
  { id: "challans", side: "left", icon: ShieldAlert, label: "Challans & Insurance", title: "Compliance & Renewals", detail: "Keep vehicle challans, documents and insurance visibility organised." },
  { id: "trips", side: "left", icon: Truck, label: "Trips", title: "Trip Operations", detail: "Follow active and completed trips with linked expenses and driver assignments." },
  { id: "drivers", side: "right", icon: Users, label: "Drivers", title: "Driver Directory & Activity", detail: "Associate drivers with vehicles, trips and spending permissions." },
  { id: "fuel", side: "right", icon: Fuel, label: "Fuel", title: "Fuel Activity Monitoring", detail: "Review fuel transactions and anomalies across supported data sources." },
  { id: "gps", side: "right", icon: MapPin, label: "GPS", title: "GPS & Geofencing", detail: "Monitor vehicle location visibility and defined operational boundaries." },
  { id: "ai", side: "right", icon: Sparkles, label: "AI Manager", title: "AI Fleet Manager (Elite)", detail: "Query fleet status, expenses and alerts through natural commands." },
  { id: "connectors", side: "right", icon: Plug, label: "AI Connectors", title: "ERP & AI Connectors", detail: "Connect supported business tools including Zoho One ERP and AI connectors." },
  { id: "bi", side: "right", icon: BarChart3, label: "Business Intelligence", title: "Operational Reporting", detail: "Structured summaries and statements to support business decisions." },
];

const capabilities = [
  {
    num: "01",
    title: "Fleet Management",
    problem: "Vehicle records, trips and operational status scattered across spreadsheets.",
    detail: "Centralise vehicle profiles, trip information, fleet visibility and daily operational activity in one workspace.",
    outcome: "Clear visibility into every vehicle's status and operational history.",
    icon: Truck,
  },
  {
    num: "02",
    title: "Driver Management",
    problem: "Constant phone calls to confirm who is driving which vehicle and what they spent.",
    detail: "Maintain driver profiles, vehicle-driver associations and supported driver management workflows.",
    outcome: "Accountable driver operations with less manual follow-up.",
    icon: Users,
  },
  {
    num: "03",
    title: "GPS & Geofencing",
    problem: "Late awareness when vehicles deviate from routes or halt unexpectedly.",
    detail: "Location visibility, vehicle monitoring and defined operational boundaries connected to your fleet view.",
    outcome: "Faster operational response when routes or zones need attention.",
    icon: MapPin,
  },
  {
    num: "04",
    title: "Fuel Monitoring",
    problem: "Fuel is the largest variable fleet cost, yet often the hardest to verify.",
    detail: "Review fuel activity and expense visibility through supported payment data sources and integrations.",
    outcome: "Spot unusual fuel spend early and link it directly to vehicles.",
    icon: Fuel,
  },
  {
    num: "05",
    title: "Payment Management",
    problem: "Cash advances and uncontrolled cards create leakage and reconciliation delays.",
    detail: "Vehicle-linked payment activity, prepaid instruments, wallets, FASTag and configurable spending controls.",
    outcome: "Controlled, traceable operational payments across your fleet.",
    icon: Wallet,
  },
  {
    num: "06",
    title: "Expense Management",
    problem: "Month-end reconciliation stalls while hunting for paper receipts and bills.",
    detail: "Capture bills, receipts, transactions and expenses structured around vehicles for business reporting.",
    outcome: "Cleaner books and faster statement preparation.",
    icon: Receipt,
  },
];

const UnifiedDashboardAndCapabilities = () => {
  const [activeId, setActiveId] = useState("payments");
  const activeSpot = hotspots.find((h) => h.id === activeId) ?? hotspots[0];
  const leftSpots = hotspots.filter((h) => h.side === "left");
  const rightSpots = hotspots.filter((h) => h.side === "right");

  return (
    <>
      {/* SECTION 06 — THE UNIFIED FLEET DASHBOARD */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              Unified Command Centre
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy">
              Your whole fleet. One screen.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Everything you need to understand and manage your fleet, in one connected environment.
              Select any module below to explore how it connects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Hotspots */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2">
              {leftSpots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveId(spot.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-xs sm:text-sm font-medium transition-all ${
                    activeId === spot.id
                      ? "border-paytap-light bg-paytap-navy text-white shadow-sm"
                      : "border-border bg-paytap-gray/50 text-paytap-navy hover:bg-paytap-gray"
                  }`}
                >
                  <spot.icon
                    className={`h-4 w-4 shrink-0 ${
                      activeId === spot.id ? "text-paytap-light" : "text-paytap-navy/60"
                    }`}
                  />
                  <span className="truncate">{spot.label}</span>
                </button>
              ))}
            </div>

            {/* Center Connected Screen */}
            <div className="lg:col-span-6 rounded-2xl border border-paytap-navy/15 bg-paytap-navy text-white p-6 sm:p-8 shadow-xl min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-paytap-light/20 text-paytap-light">
                      <activeSpot.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-white/55">
                        Connected Module
                      </div>
                      <h3 className="text-lg font-semibold text-white">{activeSpot.title}</h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/75">
                    Unified View
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                  {activeSpot.detail}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3.5">
                    <div className="text-[11px] text-white/55">Data Link</div>
                    <div className="text-sm font-semibold mt-1">Vehicle-Level</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3.5">
                    <div className="text-[11px] text-white/55">Access</div>
                    <div className="text-sm font-semibold mt-1">Web &amp; Mobile</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3.5">
                    <div className="text-[11px] text-white/55">Control</div>
                    <div className="text-sm font-semibold mt-1">Permissioned</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/60">
                Connected to Fleet, Drivers, Payments, Expenses &amp; Paytap Intelligence
              </div>
            </div>

            {/* Right Hotspots */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2">
              {rightSpots.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveId(spot.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-xs sm:text-sm font-medium transition-all ${
                    activeId === spot.id
                      ? "border-paytap-light bg-paytap-navy text-white shadow-sm"
                      : "border-border bg-paytap-gray/50 text-paytap-navy hover:bg-paytap-gray"
                  }`}
                >
                  <spot.icon
                    className={`h-4 w-4 shrink-0 ${
                      activeId === spot.id ? "text-paytap-light" : "text-paytap-navy/60"
                    }`}
                  />
                  <span className="truncate">{spot.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — THE SIX CONNECTED CAPABILITIES */}
      <section id="capabilities" className="bg-paytap-gray py-20 lg:py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              Six Connected Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy">
              One platform. Every moving part.
            </h2>
          </div>

          <div className="space-y-6">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl border border-border bg-white p-6 sm:p-8"
              >
                <div className={`lg:col-span-7 space-y-3 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-paytap-light">{cap.num}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-paytap-navy">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-paytap-navy">The challenge:</strong> {cap.problem}
                  </p>
                  <p className="text-sm sm:text-base text-paytap-navy/85 leading-relaxed">
                    {cap.detail}
                  </p>
                </div>

                <div
                  className={`lg:col-span-5 rounded-xl bg-paytap-navy text-white p-5 sm:p-6 space-y-3 ${
                    idx % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <cap.icon className="h-6 w-6 text-paytap-light" />
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    Operational Outcome
                  </div>
                  <p className="text-sm font-medium text-white leading-relaxed">{cap.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UnifiedDashboardAndCapabilities;