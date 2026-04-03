import { memo } from "react";

const DashboardMockup = memo(() => (
  <div className="bg-white rounded-md w-full h-full flex flex-col overflow-hidden text-[10px] md:text-xs">
    {/* Header bar */}
    <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="font-semibold text-primary text-[10px] md:text-xs">Paytap for Business</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-1.5 rounded bg-gray-200" />
        <div className="w-5 h-5 rounded-full bg-gray-100" />
      </div>
    </div>

    {/* Metrics row */}
    <div className="grid grid-cols-4 gap-2 md:gap-3 px-3 md:px-4 py-3 md:py-4">
      {[
        { label: "Total Vehicles", value: "128", color: "text-primary" },
        { label: "Active Cards", value: "94", color: "text-green-600" },
        { label: "Monthly Spend", value: "₹4.2L", color: "text-primary" },
        { label: "Savings", value: "₹38K", color: "text-green-600" },
      ].map((m) => (
        <div key={m.label} className="bg-gray-50 rounded-md p-2 md:p-3 text-center">
          <p className="text-[8px] md:text-[10px] text-gray-500 mb-0.5">{m.label}</p>
          <p className={`font-bold text-xs md:text-sm ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </div>

    {/* Vehicle cards */}
    <div className="px-3 md:px-4 pb-3 flex-1">
      <p className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Fleet Overview</p>
      <div className="space-y-1.5 md:space-y-2">
        {[
          { reg: "KA 01 AB 1234", status: "Active", spend: "₹12,400", statusColor: "bg-green-500" },
          { reg: "MH 02 CD 5678", status: "Active", spend: "₹9,800", statusColor: "bg-green-500" },
          { reg: "DL 03 EF 9012", status: "Idle", spend: "₹3,200", statusColor: "bg-yellow-500" },
        ].map((v) => (
          <div key={v.reg} className="flex items-center justify-between bg-gray-50 rounded px-2 md:px-3 py-1.5 md:py-2">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${v.statusColor}`} />
              <span className="font-medium text-gray-800">{v.reg}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500">{v.status}</span>
              <span className="font-medium text-primary">{v.spend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
));
DashboardMockup.displayName = "DashboardMockup";

const OurProductsSection = memo(() => {
  return (
    <section id="our-products" className="py-24 md:py-36 px-6 md:px-12 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-3">
            Paytap for Business
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto">
            Vehicle Payment & Management System
          </p>
        </div>

        {/* Laptop mockup */}
        <div
          className="mx-auto max-w-3xl group"
          style={{ perspective: "1200px" }}
        >
          <div
            className="transition-transform duration-700 ease-out group-hover:translate-y-[-4px]"
            style={{ transform: "rotateX(4deg)" }}
          >
            {/* Screen */}
            <div className="bg-[#1a1a2e] rounded-t-xl p-[6px] md:p-2 shadow-2xl">
              {/* Camera dot */}
              <div className="flex justify-center mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              </div>
              {/* Screen content */}
              <div className="rounded-sm overflow-hidden aspect-[16/10] bg-white">
                <DashboardMockup />
              </div>
            </div>

            {/* Hinge / Bottom chin */}
            <div className="mx-auto w-[90%] h-3 md:h-4 bg-[#2a2a3e] rounded-b-lg" />
            <div className="mx-auto w-[40%] h-1 bg-[#3a3a4e] rounded-b-md" />
          </div>

          {/* Shadow */}
          <div className="mx-auto w-[70%] h-4 mt-2 bg-black/[0.08] rounded-full blur-xl" />
        </div>
      </div>
    </section>
  );
});

OurProductsSection.displayName = "OurProductsSection";

export default OurProductsSection;
