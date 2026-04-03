import { memo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { MessageCircle, TrendingUp, Sparkles } from "lucide-react";

/* ── Sample Data ── */
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

/* ── Dashboard Mockup (unchanged) ── */
const DashboardMockup = memo(() => (
  <div className="bg-white rounded-md w-full h-full flex flex-col overflow-hidden text-[10px] md:text-xs">
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

/* ── Chart Card Wrapper ── */
const ChartCard = memo(({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4 md:p-5 animate-fade-in">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</p>
    <div className="h-40 md:h-48">{children}</div>
  </div>
));
ChartCard.displayName = "ChartCard";

/* ── Floating AI Card ── */
const AICard = memo(() => (
  <div
    className="hidden lg:block absolute -top-6 -right-4 z-10 w-64 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-lg shadow-lg p-4"
    style={{ animation: "float 4s ease-in-out infinite" }}
  >
    <div className="flex items-center gap-2 mb-2">
      <Sparkles className="w-4 h-4 text-accent" />
      <span className="text-xs font-bold text-foreground">Paytap AI</span>
    </div>
    <p className="text-[11px] leading-relaxed text-muted-foreground">
      Your fuel expenses increased <span className="font-semibold text-destructive">12%</span> this week.
      <br />2 vehicles are underperforming.
    </p>
  </div>
));
AICard.displayName = "AICard";

/* ── Floating Stat Card ── */
const StatCard = memo(() => (
  <div
    className="hidden lg:block absolute -top-4 -left-4 z-10 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-lg shadow-lg px-5 py-4"
    style={{ animation: "float 4s ease-in-out 1s infinite" }}
  >
    <div className="flex items-center gap-2">
      <TrendingUp className="w-4 h-4 text-green-500" />
      <div>
        <p className="text-sm font-bold text-foreground">₹38K Saved</p>
        <p className="text-[10px] text-muted-foreground">This Month</p>
      </div>
    </div>
  </div>
));
StatCard.displayName = "StatCard";

/* ── Main Section ── */
const OurProductsSection = memo(() => {
  return (
    <section id="our-products" className="py-24 md:py-36 px-6 md:px-12 bg-muted/30">
      {/* Inline keyframes */}
      <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>

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
        <div className="mx-auto max-w-3xl group" style={{ perspective: "1200px" }}>
          <div
            className="transition-transform duration-700 ease-out group-hover:translate-y-[-4px]"
            style={{ transform: "rotateX(4deg)" }}
          >
            <div className="bg-[#1a1a2e] rounded-t-xl p-[6px] md:p-2 shadow-2xl">
              <div className="flex justify-center mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
              </div>
              <div className="rounded-sm overflow-hidden aspect-[16/10] bg-white">
                <DashboardMockup />
              </div>
            </div>
            <div className="mx-auto w-[90%] h-3 md:h-4 bg-[#2a2a3e] rounded-b-lg" />
            <div className="mx-auto w-[40%] h-1 bg-[#3a3a4e] rounded-b-md" />
          </div>
          <div className="mx-auto w-[70%] h-4 mt-2 bg-black/[0.08] rounded-full blur-xl" />
        </div>

        {/* Charts + floating elements */}
        <div className="relative mt-16 md:mt-24 max-w-6xl mx-auto">
          {/* Floating cards (desktop only) */}
          <StatCard />
          <AICard />

          {/* Mobile-only floating cards */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:hidden">
            <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-lg shadow-lg px-5 py-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm font-bold text-foreground">₹38K Saved</p>
                <p className="text-[10px] text-muted-foreground">This Month</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card/80 backdrop-blur-lg shadow-lg p-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-foreground">Paytap AI</span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Fuel expenses up <span className="font-semibold text-destructive">12%</span>. 2 vehicles underperforming.
              </p>
            </div>
          </div>

          {/* Chart Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Profit vs Loss */}
            <ChartCard title="Profit vs Loss">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitLossData}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Revenue (₹K)" />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(0 72% 51%)" strokeWidth={2} dot={false} name="Expenses (₹K)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Vehicle Utilization */}
            <ChartCard title="Vehicle Utilization">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleData}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Active" />
                  <Bar dataKey="idle" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="Idle" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Expense Breakdown */}
            <ChartCard title="Expense Breakdown">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseData} cx="50%" cy="50%" innerRadius="40%" outerRadius="70%" dataKey="value" paddingAngle={3} stroke="none">
                    {expenseData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {expenseData.map((e) => (
                  <div key={e.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-[10px] text-muted-foreground">{e.name}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Chatbot Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="group/chat flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2.5 shadow-lg hover:scale-105 transition-transform duration-200"
              aria-label="Ask Paytap"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium opacity-0 max-w-0 group-hover/chat:opacity-100 group-hover/chat:max-w-[80px] transition-all duration-300 overflow-hidden whitespace-nowrap">
                Ask Paytap
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

OurProductsSection.displayName = "OurProductsSection";

export default OurProductsSection;
