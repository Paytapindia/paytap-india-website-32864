import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Layers } from "lucide-react";

const painPoints = [
  "Multiple apps for vehicles, drivers, fuel and payments",
  "Manual tracking on spreadsheets",
  "Scattered receipts and bills",
  "Cash advances and follow-ups",
  "Unclear fuel expenses",
  "Constant phone calls with drivers",
  "Late visibility into operational issues",
  "Slow month-end reconciliation",
];

const connectedNodes = [
  "Fleet Operations",
  "Driver Management",
  "Payment Controls",
  "Expense Visibility",
  "GPS & Geofencing",
  "Fuel Monitoring",
  "AI Manager",
  "Business Reporting",
];

const ProblemTransformationSection = () => {
  const [mode, setMode] = useState<"before" | "after">("after");

  return (
    <>
      {/* SECTION 02 — THE HUMAN PROBLEM */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              The Operational Reality
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy leading-tight">
              You built a business. Why are you still managing every little thing?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Growing a fleet shouldn&rsquo;t mean spending your week chasing updates across
              disconnected tools, WhatsApp threads and spreadsheets.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((point, idx) => (
              <div
                key={point}
                className="rounded-xl border border-border bg-paytap-gray/45 p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-paytap-navy/50">
                    0{idx + 1}
                  </span>
                  <AlertCircle className="h-4 w-4 text-paytap-light" />
                </div>
                <p className="text-sm font-medium text-paytap-navy leading-snug">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE TRANSFORMATION */}
      <section className="bg-paytap-gray py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
                The Transformation
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paytap-navy">
                From disconnected operations to one connected system.
              </h2>
            </div>

            <div className="inline-flex rounded-xl bg-white p-1 border border-border self-start">
              <button
                type="button"
                onClick={() => setMode("before")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                  mode === "before"
                    ? "bg-paytap-navy text-white"
                    : "text-paytap-navy/70 hover:text-paytap-navy"
                }`}
              >
                Fragmented Tools
              </button>
              <button
                type="button"
                onClick={() => setMode("after")}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                  mode === "after"
                    ? "bg-paytap-light text-white"
                    : "text-paytap-navy/70 hover:text-paytap-navy"
                }`}
              >
                One Paytap Platform
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-border p-6 sm:p-10 shadow-sm">
            {mode === "before" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-paytap-navy">
                  <Layers className="h-4 w-4 text-paytap-light" />
                  Disconnected spreadsheets, separate apps and manual follow-ups
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    "Excel Sheets",
                    "Driver Calls",
                    "Fuel Receipts",
                    "Cash Advances",
                    "Separate GPS App",
                    "FASTag Portal",
                    "Bank Statements",
                    "Paper Bills",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-dashed border-paytap-navy/25 bg-paytap-gray/50 px-4 py-4 text-center text-sm font-medium text-paytap-navy/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-paytap-navy">
                    <CheckCircle2 className="h-4 w-4 text-paytap-light" />
                    Paytap Command Centre — All operational signals unified
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-paytap-light">
                    Connected Intelligence <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {connectedNodes.map((node) => (
                    <div
                      key={node}
                      className="rounded-xl border border-paytap-navy/15 bg-paytap-navy text-white px-4 py-4 text-center text-sm font-medium shadow-sm"
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProblemTransformationSection;