import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  CreditCard,
  Fuel,
  MapPin,
  Radio,
  Shield,
  Sliders,
  Sparkles,
  Truck,
  AlertTriangle,
  Receipt,
} from "lucide-react";

export interface DemoScreenConfig {
  id: string;
  title: string;
  badge: string;
  ownerMsg: string;
  aiMsg: string;
}

export const DEMO_SCREENS: DemoScreenConfig[] = [
  {
    id: "tap-pay",
    title: "Tap & Pay",
    badge: "Contactless Flow",
    ownerMsg: "How was MH12 AB 4521's last payment processed?",
    aiMsg: "RuPay NFC tag tapped at HP Pump, Pune. ₹2,450 approved under daily limit & receipt auto-logged.",
  },
  {
    id: "nfc-pump",
    title: "NFC Tap at Fuel Pump",
    badge: "Pump Integration",
    ownerMsg: "Verify fuel tap for MH12 AB 4521 right now.",
    aiMsg: "Vehicle at HP Pump, Pune. NFC tag verified, ₹5,000 limit checked, ₹2,450 paid & linked to trip.",
  },
  {
    id: "owner-control",
    title: "Owner in Control",
    badge: "Live Controls",
    ownerMsg: "Cap daily fuel at ₹4,000 and pause KA01 CD 8821.",
    aiMsg: "Daily cap updated to ₹4,000. KA01 CD 8821 tag paused instantly — ready to resume anytime.",
  },
  {
    id: "notifications",
    title: "Instant Notifications",
    badge: "Real-Time Alerts",
    ownerMsg: "Any urgent alerts from the last 10 minutes?",
    aiMsg: "2 alerts: KA05 MN 1102 crossed ₹3,500 limit, and DL01 XY 3319 flagged for unusual fuel spend.",
  },
  {
    id: "fleet-live",
    title: "Fleet & Drivers Live",
    badge: "24 Active",
    ownerMsg: "Give me a quick status of active vehicles.",
    aiMsg: "22 drivers on duty across 24 vehicles. 1 at fuel pump, 20 on route, 1 flagged for review.",
  },
  {
    id: "ai-commands",
    title: "AI Manager Commands",
    badge: "Elite · Approval",
    ownerMsg: "Show me vehicles with unusual fuel expenses today.",
    aiMsg: "3 vehicles flagged against trip distance & spend limits. Awaiting your approval before any change.",
  },
];

const TapPayScreen = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { icon: CreditCard, label: "Vehicle Tag", sub: "MH12 AB 4521" },
    { icon: Radio, label: "NFC Tap", sub: "HP Pump POS" },
    { icon: CheckCircle2, label: "Approved", sub: "₹2,450 · OK" },
    { icon: Receipt, label: "Receipt", sub: "Auto-Logged" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((item, idx) => {
          const active = idx <= step;
          const current = idx === step;
          return (
            <div
              key={item.label}
              className={`rounded-xl border p-2.5 text-center transition-all duration-300 ${
                current
                  ? "border-paytap-light bg-paytap-light/15 scale-[1.03]"
                  : active
                    ? "border-white/25 bg-paytap-navy/90"
                    : "border-white/10 bg-paytap-navy/50 opacity-55"
              }`}
            >
              <item.icon
                className={`mx-auto h-4 w-4 mb-1 ${current ? "text-paytap-light" : "text-white/80"}`}
              />
              <div className="text-[11px] font-semibold text-white">{item.label}</div>
              <div className="text-[10px] text-white/60 truncate">{item.sub}</div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between rounded-lg bg-paytap-navy/85 border border-white/10 px-3 py-2 text-xs">
        <span className="text-white/75">Zero cash · Zero driver reimbursement</span>
        <span className="font-semibold text-paytap-light">₹2,450 Settled</span>
      </div>
    </div>
  );
};

const NfcPumpScreen = () => {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const checks = [
    "Car arrived at HP Pump, Pune",
    "NFC tag tapped — ₹5,000 limit OK",
    "₹2,450 paid & logged to MH12 AB 4521",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
      <div className="sm:col-span-5 rounded-xl border border-paytap-light/35 bg-paytap-navy/90 p-3 text-center">
        <div className="relative mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-paytap-light/20 text-paytap-light">
          <span className="absolute inset-0 rounded-full border border-paytap-light/50 animate-ping opacity-40" />
          <Fuel className="h-5 w-5 relative" />
        </div>
        <div className="text-xs font-semibold text-white">NFC Tap Detected</div>
        <div className="text-[10px] text-white/60">MH12 AB 4521 · RuPay Tag</div>
      </div>
      <div className="sm:col-span-7 space-y-1.5">
        {checks.map((text, idx) => (
          <div
            key={text}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300 ${
              idx <= stage
                ? "border-paytap-light/40 bg-white/10 text-white"
                : "border-white/10 bg-paytap-navy/50 text-white/45"
            }`}
          >
            <CheckCircle2
              className={`h-3.5 w-3.5 shrink-0 ${idx <= stage ? "text-paytap-light" : "text-white/30"}`}
            />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OwnerControlScreen = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((s) => (s + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const controls = [
    { label: "Daily Fuel Cap · MH12 AB 4521", value: "₹4,000 / day", active: true },
    { label: "Block Tag · KA01 CD 8821", value: tick >= 1 ? "Paused" : "Active", active: tick >= 1 },
    { label: "Top-Up Request · ₹10,000", value: tick === 2 ? "Approved" : "Pending", active: tick === 2 },
  ];

  return (
    <div className="space-y-2">
      {controls.map((c) => (
        <div
          key={c.label}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-paytap-navy/85 px-3 py-2"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sliders className="h-3.5 w-3.5 text-paytap-light shrink-0" />
            <span className="text-xs text-white truncate">{c.label}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-medium text-white/75">{c.value}</span>
            <span
              className={`inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors ${
                c.active ? "bg-paytap-light justify-end" : "bg-white/20 justify-start"
              }`}
            >
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const NotificationsScreen = () => {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v >= 3 ? 1 : v + 1)), 1700);
    return () => clearInterval(t);
  }, []);

  const alerts = [
    { icon: CheckCircle2, title: "Payment Done · ₹2,450", sub: "MH12 AB 4521 at HP Pump, Pune", tone: "text-emerald-400" },
    { icon: AlertTriangle, title: "Limit Crossed · KA05 MN 1102", sub: "Attempted ₹4,200 (₹3,500 cap)", tone: "text-paytap-light" },
    { icon: Bell, title: "Unusual Fuel Spend Flagged", sub: "DL01 XY 3319 · 2 fills in 4 hrs", tone: "text-amber-300" },
  ];

  return (
    <div className="space-y-2">
      {alerts.map((a, idx) => (
        <div
          key={a.title}
          className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 transition-all duration-300 ${
            idx < visible
              ? "border-white/15 bg-paytap-navy/90 opacity-100 translate-y-0"
              : "border-white/5 bg-paytap-navy/40 opacity-35 translate-y-1"
          }`}
        >
          <a.icon className={`h-4 w-4 mt-0.5 shrink-0 ${a.tone}`} />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white truncate">{a.title}</div>
            <div className="text-[11px] text-white/65 truncate">{a.sub}</div>
          </div>
          <span className="text-[10px] text-white/45 shrink-0">Just now</span>
        </div>
      ))}
    </div>
  );
};

const FleetLiveScreen = () => {
  const [km, setKm] = useState(142);
  useEffect(() => {
    const t = setInterval(() => setKm((k) => k + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const rows = [
    { plate: "MH12 AB 4521", driver: "Rajesh K.", status: "On Trip", meta: `${km} km`, dot: "bg-emerald-400" },
    { plate: "KA01 CD 8821", driver: "Suresh M.", status: "At Pump", meta: "₹2,450", dot: "bg-paytap-light" },
    { plate: "DL01 XY 3319", driver: "Amit S.", status: "Alert", meta: "Review", dot: "bg-amber-300" },
  ];

  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.plate}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-paytap-navy/85 px-3 py-2 text-xs"
        >
          <div className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-paytap-light" />
            <div>
              <div className="font-semibold text-white">{r.plate}</div>
              <div className="text-[10px] text-white/55">{r.driver}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/70">{r.meta}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white">
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${r.dot}`} />
              {r.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const AiCommandsScreen = () => (
  <div className="rounded-xl border border-paytap-light/35 bg-paytap-navy/85 p-3 space-y-2.5">
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
        <Sparkles className="h-3.5 w-3.5 text-paytap-light" />
        3 vehicles flagged for review
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
        <Shield className="h-3 w-3 text-paytap-light" />
        Approval Required
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2 text-[11px]">
      <div className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5">
        <div className="text-white/55">Variance detected</div>
        <div className="font-semibold text-paytap-light">+28% vs route avg</div>
      </div>
      <div className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5">
        <div className="text-white/55">Evidence linked</div>
        <div className="inline-flex items-center gap-1 font-semibold text-white">
          <MapPin className="h-3 w-3 text-paytap-light" /> GPS &amp; Receipt
        </div>
      </div>
    </div>
  </div>
);

export const ScreenVisual = ({ screenId }: { screenId: string }) => {
  switch (screenId) {
    case "tap-pay":
      return <TapPayScreen />;
    case "nfc-pump":
      return <NfcPumpScreen />;
    case "owner-control":
      return <OwnerControlScreen />;
    case "notifications":
      return <NotificationsScreen />;
    case "fleet-live":
      return <FleetLiveScreen />;
    default:
      return <AiCommandsScreen />;
  }
};