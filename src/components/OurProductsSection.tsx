import { memo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { MessageCircle, TrendingUp, Sparkles } from "lucide-react";

const profitLossData = [
  { month: "Jan", revenue: 82, expenses: 65 },
  { month: "Feb", revenue: 91, expenses: 70 },
  { month: "Mar", revenue: 78, expenses: 62 },
  { month: "Apr", revenue: 105, expenses: 74 },
  { month: "May", revenue: 112, expenses: 80 },
  { month: "Jun", revenue: 120, expenses: 78 },
];

const vehicleData = [
  { name: "Trucks", active: 42, idle: 8 },
  { name: "Vans", active: 28, idle: 5 },
  { name: "Cars", active: 18, idle: 3 },
  { name: "Bikes", active: 6, idle: 2 },
];

const expenseData = [
  { name: "Fuel", value: 45, color: "hsl(var(--primary))" },
  { name: "Maintenance", value: 25, color: "hsl(210 60% 50%)" },
  { name: "Tolls", value: 18, color: "hsl(210 40% 65%)" },
  { name: "Misc", value: 12, color: "hsl(210 20% 78%)" },
];

const DashboardMockup = memo(() => (
  <div className="bg-white rounded-md w-full h-full flex flex-col overflow-hidden text-[10px] md:text-xs">
    {/* Top bar */}
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

    {/* Metric cards */}
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

    {/* Fleet Overview */}
    <div className="px-3 md:px-4 pb-3">
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

    {/* AI Insight + Savings row */}
    <div className="px-3 md:px-4 pb-3 flex gap-2">
      <div className="flex-1 rounded-lg border border-gray-100 bg-gray-50/80 p-2">
        <div className="flex items-center gap-1 mb-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[9px] md:text-[10px] font-bold text-gray-700">Paytap AI</span>
        </div>
        <p className="text-[8px] md:text-[9px] leading-relaxed text-gray-500">
          Fuel expenses up <span className="font-semibold text-red-500">12%</span> this week. 2 vehicles underperforming.
        </p>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2 flex items-center gap-2">
        <TrendingUp className="w-3 h-3 text-green-500" />
        <div>
          <p className="text-[10px] md:text-xs font-bold text-gray-800">₹38K</p>
          <p className="text-[7px] md:text-[8px] text-gray-500">Saved this month</p>
        </div>
      </div>
    </div>

    {/* Charts row */}
    <div className="px-3 md:px-4 pb-3 grid grid-cols-3 gap-2">
      {/* Profit vs Loss */}
      <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2">
        <p className="text-[8px] md:text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Profit vs Loss</p>
        <div className="h-20 md:h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitLossData}>
              <XAxis dataKey="month" tick={{ fontSize: 7 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 7 }} stroke="#9ca3af" width={20} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="hsl(0 72% 51%)" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vehicle Utilization */}
      <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2">
        <p className="text-[8px] md:text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Vehicle Activity</p>
        <div className="h-20 md:h-28">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vehicleData}>
              <XAxis dataKey="name" tick={{ fontSize: 7 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 7 }} stroke="#9ca3af" width={20} />
              <Bar dataKey="active" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="idle" fill="#9ca3af" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-2">
        <p className="text-[8px] md:text-[9px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Expenses</p>
        <div className="h-20 md:h-28 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={expenseData} cx="50%" cy="50%" innerRadius="35%" outerRadius="65%" dataKey="value" paddingAngle={2} stroke="none">
                {expenseData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          {expenseData.map((e) => (
            <div key={e.name} className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="text-[7px] text-gray-500">{e.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Ask Paytap button */}
    <div className="px-3 md:px-4 pb-3 flex justify-end">
      <div className="flex items-center gap-1 bg-primary text-white rounded-full px-2.5 py-1">
        <MessageCircle className="w-3 h-3" />
        <span className="text-[8px] md:text-[9px] font-medium">Ask Paytap</span>
      </div>
    </div>
  </div>
));
DashboardMockup.displayName = "DashboardMockup";

const OurProductsSection = memo(() => (
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
        <p className="text-muted-foreground/70 text-xs md:text-sm max-w-md mx-auto mt-2 italic">
          "Turn Every Vehicle Into an Accountable Asset."
        </p>
      </div>

      {/* Laptop mockup */}
      <div className="mx-auto max-w-4xl group" style={{ perspective: "1200px" }}>
        <div
          className="transition-transform duration-700 ease-out group-hover:translate-y-[-4px]"
          style={{ transform: "rotateX(4deg)" }}
        >
          <div className="bg-[#1a1a2e] rounded-t-xl p-[6px] md:p-2 shadow-2xl">
            <div className="flex justify-center mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            </div>
            <div className="rounded-sm overflow-hidden bg-white">
              <DashboardMockup />
            </div>
          </div>
          <div className="mx-auto w-[90%] h-3 md:h-4 bg-[#2a2a3e] rounded-b-lg" />
          <div className="mx-auto w-[40%] h-1 bg-[#3a3a4e] rounded-b-md" />
        </div>
        <div className="mx-auto w-[70%] h-4 mt-2 bg-black/[0.08] rounded-full blur-xl" />
      </div>
    </div>
  </section>
));

OurProductsSection.displayName = "OurProductsSection";

export default OurProductsSection;
