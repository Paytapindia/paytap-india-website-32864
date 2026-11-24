import { ArrowDown, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

const beforeList = [
  "Sunday spent on Excel",
  "Five apps and a notebook",
  "Cash and follow-ups with drivers",
  "Manually gathering receipts",
  "End-of-month reconciliation",
];

const withPaytapList = [
  "Consolidated information",
  "Vehicle-linked payment activity",
  "One connected dashboard",
  "Organised operational data",
  "Statements and reporting where supported",
];

const governanceControls = [
  "User permissions & role-based access",
  "Spending rules & vehicle-level controls",
  "Driver-related restrictions",
  "AI recommendations clearly distinguished from actions",
  "Required human approvals before execution",
  "Audit and activity records",
];

const approvalFlow = [
  "Owner Command",
  "AI Context Understanding",
  "Rules & Permissions",
  "Required Approval",
  "Authorised Execution",
  "Activity Record",
];

const TimeBackAndGovernance = () => {
  return (
    <>
      {/* SECTION 11 — GET YOUR TIME BACK */}
      <section className="bg-paytap-gray py-20 lg:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light mb-3">
              Get Your Time Back
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-paytap-navy">
              Less chasing. More growing.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              The work that grows your business should get more of your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Before Paytap
              </div>
              <ul className="space-y-3.5">
                {beforeList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-paytap-navy/80">
                    <XCircle className="h-5 w-5 text-paytap-navy/35 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-paytap-navy bg-paytap-navy text-white p-6 sm:p-8 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-paytap-light">
                With Paytap
              </div>
              <ul className="space-y-3.5">
                {withPaytapList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="h-5 w-5 text-paytap-light shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 — INTELLIGENCE WITH CONTROL */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-paytap-light">
                Governance &amp; Control
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-paytap-navy">
                Intelligent operations. Human-controlled decisions.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Paytap distinguishes between AI recommendations, proposed changes and authorised
                actions — so financial and operational changes stay under your control.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {governanceControls.map((ctrl) => (
                  <div
                    key={ctrl}
                    className="flex items-start gap-2.5 rounded-xl border border-border bg-paytap-gray/40 p-4 text-xs sm:text-sm font-medium text-paytap-navy"
                  >
                    <ShieldCheck className="h-4 w-4 text-paytap-light shrink-0 mt-0.5" />
                    <span>{ctrl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-border bg-paytap-gray/50 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-paytap-navy/60 mb-5">
                Human-in-the-Loop Approval Flow
              </div>
              <div className="space-y-1.5">
                {approvalFlow.map((step, idx) => (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                        step === "Required Approval"
                          ? "border-paytap-light bg-paytap-light text-white"
                          : "border-border bg-white text-paytap-navy"
                      }`}
                    >
                      {step}
                    </div>
                    {idx < approvalFlow.length - 1 && (
                      <ArrowDown className="h-4 w-4 text-paytap-navy/40 my-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimeBackAndGovernance;