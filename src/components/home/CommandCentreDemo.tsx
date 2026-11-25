import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Shield } from "lucide-react";
import { DEMO_SCREENS, ScreenVisual } from "./CommandCentreScreens";

const LIVE_FEED = [
  "MH12 AB 4521 paid ₹2,450 at HP Pump, Pune",
  "KA01 CD 8821 daily fuel cap updated to ₹4,000",
  "DL01 XY 3319 flagged for unusual fuel spend",
  "MH14 GH 9021 FASTag auto-recharged ₹1,000",
];

const DemoChat = ({ ownerMsg, aiMsg, screenKey }: { ownerMsg: string; aiMsg: string; screenKey: string }) => {
  const [phase, setPhase] = useState<"typing" | "reply">("typing");

  useEffect(() => {
    setPhase("typing");
    const t = setTimeout(() => setPhase("reply"), 1100);
    return () => clearTimeout(t);
  }, [screenKey]);

  return (
    <div className="rounded-xl border border-paytap-light/30 bg-gradient-to-br from-white/10 to-white/[0.03] p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-paytap-light" />
          <span className="text-[11px] font-semibold text-white">Paytap AI Manager</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/75">
          <Shield className="h-2.5 w-2.5 text-paytap-light" />
          Live Demo · Read-only
        </span>
      </div>

      <div className="rounded-lg bg-paytap-navy/90 border border-white/10 px-2.5 py-1.5 text-[11px]">
        <span className="text-white/55 mr-1.5">Owner:</span>
        <span className="text-white font-medium">&ldquo;{ownerMsg}&rdquo;</span>
      </div>

      <div className="rounded-lg bg-white/10 px-2.5 py-2 text-[11px] text-white/85 min-h-[42px] flex items-center">
        {phase === "typing" ? (
          <span className="inline-flex items-center gap-1 text-white/60">
            AI Manager is checking
            <span className="inline-flex gap-0.5 ml-1">
              <span className="h-1 w-1 rounded-full bg-paytap-light animate-bounce" />
              <span className="h-1 w-1 rounded-full bg-paytap-light animate-bounce [animation-delay:120ms]" />
              <span className="h-1 w-1 rounded-full bg-paytap-light animate-bounce [animation-delay:240ms]" />
            </span>
          </span>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed">
            {aiMsg}
          </motion.p>
        )}
      </div>
    </div>
  );
};

const CommandCentreDemo = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const feedTimer = setInterval(() => setFeedIdx((f) => (f + 1) % LIVE_FEED.length), 3200);
    return () => clearInterval(feedTimer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const slideTimer = setInterval(() => setIndex((i) => (i + 1) % DEMO_SCREENS.length), 7000);
    return () => clearInterval(slideTimer);
  }, [paused]);

  const current = DEMO_SCREENS[index] ?? DEMO_SCREENS[0];
  const goPrev = () => setIndex((i) => (i - 1 + DEMO_SCREENS.length) % DEMO_SCREENS.length);
  const goNext = () => setIndex((i) => (i + 1) % DEMO_SCREENS.length);

  return (
    <div
      className="space-y-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md p-4 sm:p-5 shadow-2xl space-y-3.5">
        {/* Window Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-paytap-light animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-white/95">
              Paytap Command Centre
            </span>
          </div>
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/75">
            Illustrative Preview
          </span>
        </div>

        {/* Live Activity Ticker */}
        <div className="flex items-center gap-2 rounded-lg bg-paytap-navy/90 border border-white/10 px-3 py-1.5 text-[11px] overflow-hidden">
          <span className="inline-flex items-center gap-1 font-semibold text-paytap-light shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-paytap-light animate-ping" />
            LIVE
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={feedIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-white/80 truncate"
            >
              {LIVE_FEED[feedIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Active Screen Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{current.title}</span>
          <span className="rounded-full bg-paytap-light/15 border border-paytap-light/30 px-2.5 py-0.5 text-[10px] font-medium text-paytap-light">
            {current.badge}
          </span>
        </div>

        {/* Active Screen Visual */}
        <div className="min-h-[146px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.25 }}
            >
              <ScreenVisual screenId={current.id} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Embedded Demo Chatbot */}
        <DemoChat ownerMsg={current.ownerMsg} aiMsg={current.aiMsg} screenKey={current.id} />
      </div>

      {/* Left / Right Controls & Dots Below Box */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous command centre screen"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-paytap-light hover:border-paytap-light transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            {DEMO_SCREENS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(idx)}
                aria-label={`Show ${s.title}`}
                className={`h-2 rounded-full transition-all ${
                  idx === index ? "w-6 bg-paytap-light" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/65">
            {index + 1} / {DEMO_SCREENS.length} · {current.title}
          </span>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next command centre screen"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-paytap-light hover:border-paytap-light transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CommandCentreDemo;