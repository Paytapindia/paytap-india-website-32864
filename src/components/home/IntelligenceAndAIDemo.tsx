import { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowDown, Terminal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoCommand {
  id: string;
  prompt: string;
  processing: string;
  headline: string;
  rows: { label: string; value: string; status?: string }[];
  insight: string;
  suggestedAction: string;
  requiresApproval: boolean;
}

const demoCommands: DemoCommand[] = [
  {
    id: "status",
    prompt: "Show me my fleet status today.",
    processing: "Reviewing active vehicles, assigned drivers and trip activity...",
    headline: "24 of 28 vehicles active on scheduled routes",
    rows: [
      { label: "Active on Route", value: "24 vehicles", status: "Normal" },
      { label: "Idle / Yard", value: "3 vehicles", status: "Scheduled" },
      { label: "Maintenance / Review", value: "1 vehicle (KA-01-AB-4412)", status: "Check" },
    ],
    insight: "All active trips have assigned drivers and active payment controls.",
    suggestedAction: "Inspect maintenance log for KA-01-AB-4412.",
    requiresApproval: false,
  },
  {
    id: "fuel",
    prompt: "Identify unusual fuel expenses.",
    processing: "Reviewing available fuel transactions and vehicle expense information...",
    headline: "3 vehicles flagged for fuel spend review",
    rows: [
      { label: "KA-01-MJ-2219", value: "₹9,400 (2 refuels in 6 hrs)", status: "Review" },
      { label: "MH-12-TR-8841", value: "₹7,850 (above route baseline)", status: "Review" },
      { label: "TN-09-CL-1054", value: "₹6,200 (missing receipt photo)", status: "Receipt" },
    ],
    insight: "Three fuel entries sit outside recent vehicle patterns and need owner review.",
    suggestedAction: "Temporarily tighten daily fuel limit on KA-01-MJ-2219 until verified.",
    requiresApproval: true,
  },
  {
    id: "drivers",
    prompt: "Show my vehicle and driver activity.",
    processing: "Correlating driver assignments, active shifts and vehicle logs...",
    headline: "22 drivers active across 3 operating zones",
    rows: [
      { label: "Bengaluru Hub", value: "11 drivers / 12 vehicles", status: "Active" },
      { label: "Pune Corridor", value: "7 drivers / 8 vehicles", status: "Active" },
      { label: "Chennai Distribution", value: "4 drivers / 4 vehicles", status: "Active" },
    ],
    insight: "2 unassigned vehicles are ready for next shift dispatch.",
    suggestedAction: "Assign standby drivers for evening dispatch.",
    requiresApproval: true,
  },
  {
    id: "payments",
    prompt: "Review today's payment transactions.",
    processing: "Aggregating vehicle-linked payment tags, FASTag and wallet entries...",
    headline: "41 vehicle-linked transactions recorded today",
    rows: [
      { label: "Fuel Payments", value: "26 transactions", status: "Categorised" },
      { label: "FASTag & Tolls", value: "11 transactions", status: "Verified" },
      { label: "Repairs & Parking", value: "4 transactions", status: "2 Receipts Pending" },
    ],
    insight: "39 of 41 transactions are automatically matched to vehicles and drivers.",
    suggestedAction: "Send receipt reminder for the 2 pending repair bills.",
    requiresApproval: false,
  },
  {
    id: "geofence",
    prompt: "Show vehicles with geofence alerts.",
    processing: "Checking GPS boundaries and configured route corridors...",
    headline: "2 vehicles outside defined operational boundaries",
    rows: [
      { label: "KA-05-HN-7720", value: "Exited Hosur Logistics Zone (14 min ago)", status: "Alert" },
      { label: "MH-14-KL-3309", value: "Extended halt outside Chakan Hub", status: "Alert" },
    ],
    insight: "Both alerts are linked to active trips and assigned drivers for quick follow-up.",
    suggestedAction: "Notify hub supervisor to confirm route deviation.",
    requiresApproval: true,
  },
  {
    id: "summary",
    prompt: "Prepare a fleet expense summary.",
    processing: "Organising bills, receipts and vehicle-linked spend by category...",
    headline: "Weekly operational expense breakdown ready",
    rows: [
      { label: "Fuel & Energy", value: "62% of fleet spend", status: "Tracked" },
      { label: "Tolls & FASTag", value: "19% of fleet spend", status: "Tracked" },
      { label: "Maintenance & Trips", value: "19% of fleet spend", status: "Tracked" },
    ],
    insight: "Structured by vehicle and driver for faster accounting and reconciliation.",
    suggestedAction: "Export summary statement for finance team.",
    requiresApproval: false,
  },
];

const architectureSteps = [
  "Paytap Intelligence",
  "AI Management Experiences",
  "Fleet, Driver, Payment & Expense Information",
  "Rules, Permissions & Authorised Actions",
];

const IntelligenceAndAIDemo = () => {
  const [selectedId, setSelectedId] = useState<string>("fuel");
  const [isProcessing, setIsProcessing] = useState(false);
  const [approved, setApproved] = useState(false);

  const activeCmd = demoCommands.find((c) => c.id === selectedId) ?? demoCommands[0];

  useEffect(() => {
    setIsProcessing(true);
    setApproved(false);
    const timer = setTimeout(() => setIsProcessing(false), 450);
    return () => clearTimeout(timer);
  }, [selectedId]);

  return (
    <section id="intelligence-layer" className="bg-paytap-navy text-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* SECTION 04 — THE PAYTAP INTELLIGENCE LAYER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light">
              The Paytap Intelligence Layer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Meet the AI behind your fleet.
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              Paytap separates what you can use today from what we are actively building — so you
              always know what is live and what is on the roadmap.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-paytap-light/40 bg-white/[0.06] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-paytap-light">
                    Available in Elite
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-paytap-light" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Fleet Manager</h3>
                <p className="text-xs text-white/75 leading-relaxed">
                  Ask questions, review vehicle and driver activity, spot unusual fuel or expense
                  entries, and surface operational insights with human-approved controls.
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    In Development
                  </span>
                  <Clock className="h-4 w-4 text-white/60" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Business Manager</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Our roadmap vision for broader AI-powered business operations across fleet,
                  finance and connected enterprise workflows. Not yet commercially available.
                </p>
              </div>
            </div>
          </div>

          {/* 4-Layer Architecture Illustration */}
          <div className="lg:col-span-6 rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-5">
              Intelligence Architecture
            </div>
            <div className="space-y-2">
              {architectureSteps.map((step, idx) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-full rounded-xl border px-5 py-4 text-center text-sm font-semibold ${
                      idx === 0
                        ? "border-paytap-light bg-paytap-light/15 text-white"
                        : "border-white/15 bg-paytap-navy/80 text-white/90"
                    }`}
                  >
                    {step}
                  </div>
                  {idx < architectureSteps.length - 1 && (
                    <ArrowDown className="h-4 w-4 text-paytap-light my-1.5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 05 — AI MANAGER INTERACTIVE DEMONSTRATION */}
        <div id="ai-demo" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-2">
                Interactive Simulation
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Don&rsquo;t manage every task. Just ask your AI Manager.
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/75 self-start">
              <AlertTriangle className="h-3.5 w-3.5 text-paytap-light" />
              Illustrative sample data — locally simulated
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Command Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-medium uppercase tracking-wider text-white/55 mb-2">
                Select an owner command
              </div>
              {demoCommands.map((cmd, idx) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => setSelectedId(cmd.id)}
                  className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all flex items-start gap-3 ${
                    selectedId === cmd.id
                      ? "border-paytap-light bg-paytap-light/15 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="text-xs font-semibold text-paytap-light mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-medium leading-snug">{cmd.prompt}</span>
                </button>
              ))}
            </div>

            {/* Live Response Console */}
            <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-white/[0.05] p-5 sm:p-7 flex flex-col justify-between min-h-[380px]">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                    <Terminal className="h-4 w-4 text-paytap-light" />
                    Paytap AI Manager Console
                  </div>
                  <span className="text-[11px] text-white/55">Simulated Environment</span>
                </div>

                <div className="rounded-xl bg-paytap-navy/90 border border-white/10 p-3.5 text-sm">
                  <span className="text-xs uppercase tracking-wider text-white/50 block mb-1">
                    Owner
                  </span>
                  {activeCmd.prompt}
                </div>

                {isProcessing ? (
                  <div className="flex items-center gap-3 py-8 text-sm text-white/75">
                    <Sparkles className="h-4 w-4 text-paytap-light animate-spin" />
                    {activeCmd.processing}
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-paytap-light font-semibold">
                        Result
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-0.5">
                        {activeCmd.headline}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {activeCmd.rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm"
                        >
                          <span className="font-medium text-white">{row.label}</span>
                          <div className="flex items-center gap-2.5">
                            <span className="text-white/80">{row.value}</span>
                            {row.status && (
                              <span className="rounded-md bg-paytap-light/20 px-2 py-0.5 text-[11px] font-medium text-paytap-light">
                                {row.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                      <strong className="text-white">Insight:</strong> {activeCmd.insight}
                    </p>
                  </div>
                )}
              </div>

              {!isProcessing && (
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-white/80">
                    <span className="font-semibold text-white">Suggested Action: </span>
                    {activeCmd.suggestedAction}
                  </div>
                  {activeCmd.requiresApproval ? (
                    <Button
                      size="sm"
                      onClick={() => setApproved(true)}
                      disabled={approved}
                      className={
                        approved
                          ? "bg-emerald-600 text-white hover:bg-emerald-600"
                          : "bg-paytap-light hover:bg-paytap-light/90 text-white"
                      }
                    >
                      <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                      {approved ? "Approved & Logged" : "Approve Action"}
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                      <CheckCircle2 className="h-3.5 w-3.5 text-paytap-light" />
                      Read-only insight
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntelligenceAndAIDemo;