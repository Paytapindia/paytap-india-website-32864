import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_SCREENS, ScreenVisual } from "./CommandCentreScreens";

const LIVE_FEED = [
  "MH12 AB 4521 paid ₹2,450 at HP Pump, Pune",
  "KA01 CD 8821 daily fuel cap updated to ₹4,000",
  "DL01 XY 3319 flagged for unusual fuel spend",
  "MH14 GH 9021 FASTag auto-recharged ₹1,000",
];

const DemoChat = ({ ownerMsg, aiMsg }: { ownerMsg: string; aiMsg: string }) => (
  <div className="border-t border-border pt-4">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-card-foreground">
        <Sparkles className="h-3.5 w-3.5 text-accent" />Paytap AI Manager
      </span>
      <span className="inline-flex items-center gap-1 text-[9px] text-muted-foreground">
        <Shield className="h-2.5 w-2.5" />Live Demo · Read-only
      </span>
    </div>
    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
      <span className="mr-1.5">Owner:</span><span>&ldquo;{ownerMsg}&rdquo;</span>
    </p>
    <p className="mt-2 text-[11px] leading-relaxed text-card-foreground">{aiMsg}</p>
  </div>
);

const CommandCentreDemo = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setFeedIdx((f) => (f + 1) % LIVE_FEED.length), 5000);
    return () => clearInterval(timer);
  }, [reducedMotion]);
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % DEMO_SCREENS.length), 9000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const current = DEMO_SCREENS[index] ?? DEMO_SCREENS[0];
  return (
    <div className="space-y-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-4">
          <span className="text-xs font-semibold">Paytap Command Centre</span>
          <span className="text-[9px] text-muted-foreground">Illustrative Preview</span>
        </div>
        <div className="px-5 py-5 sm:px-6">
          <div className="mb-5 flex items-center gap-2 text-[10px]">
            <span className="text-accent shrink-0 font-medium">LIVE</span>
            <span className="truncate text-muted-foreground">{LIVE_FEED[feedIdx]}</span>
          </div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">{current.title}</span>
            <span className="text-[10px] text-muted-foreground">{current.badge}</span>
          </div>
          <div className="h-[164px] sm:h-[148px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
                <ScreenVisual screenId={current.id} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="min-h-[144px] sm:min-h-[128px]"><DemoChat ownerMsg={current.ownerMsg} aiMsg={current.aiMsg} /></div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 text-primary-foreground/65">
        <Button type="button" variant="ghost" size="icon" onClick={() => setIndex((i) => (i - 1 + DEMO_SCREENS.length) % DEMO_SCREENS.length)} aria-label="Previous command centre screen" title="Previous screen" className="h-8 w-8 rounded-full text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"><ChevronLeft /></Button>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {DEMO_SCREENS.map((screen, idx) => (
              <Button key={screen.id} type="button" variant="ghost" onClick={() => setIndex(idx)} aria-label={`Show ${screen.title}`} aria-pressed={index === idx} title={screen.title} className="h-5 w-5 rounded-full p-0 hover:bg-primary-foreground/10">
                <span className={`h-1.5 w-1.5 rounded-full ${idx === index ? "bg-primary-foreground" : "bg-primary-foreground/25"}`} />
              </Button>
            ))}
          </div>
          <span className="text-[10px]">{index + 1} / {DEMO_SCREENS.length} · {current.title}</span>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={() => setIndex((i) => (i + 1) % DEMO_SCREENS.length)} aria-label="Next command centre screen" title="Next screen" className="h-8 w-8 rounded-full text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"><ChevronRight /></Button>
      </div>
    </div>
  );
};
export default CommandCentreDemo;
