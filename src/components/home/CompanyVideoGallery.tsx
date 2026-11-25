import { useEffect, useRef, useState } from "react";
import { Play, Youtube } from "lucide-react";

interface CompanyVideo {
  id: string;
  title: string;
  category: string;
  views: string;
  youtubeId: string;
}

const CHANNEL_URL = "https://www.youtube.com/@PaytapIndia";
const AUTO_ADVANCE_MS = 3000;

const COMPANY_VIDEOS: CompanyVideo[] = [
  {
    id: "live-demo",
    title: "Paytap Tap & Pay Live Demo",
    category: "Product Demo",
    views: "Shorts",
    youtubeId: "ODRQcGWRaiE",
  },
  {
    id: "owner-control",
    title: "Owners Managing All Vehicle Payments From Home",
    category: "Owner Control",
    views: "1.2M views",
    youtubeId: "MfKl7yD4Y-g",
  },
  {
    id: "smart-owners",
    title: "Smart Owners Control All Business Expenses",
    category: "Expense Control",
    views: "337K views",
    youtubeId: "_HOp8faXJ1Y",
  },
  {
    id: "upgrade",
    title: "It's an Upgrade — Most Are Not Aware Of It",
    category: "Platform",
    views: "97K views",
    youtubeId: "7npiX2AOpvc",
  },
  {
    id: "how-do-you-pay",
    title: "How Do You Pay at the Pump?",
    category: "Fuel Payments",
    views: "54K views",
    youtubeId: "em7CrBRnC74",
  },
  {
    id: "premium-car",
    title: "How Does Your Premium Car Pay?",
    category: "NFC Tap & Pay",
    views: "42K views",
    youtubeId: "wyxRB3cO7bQ",
  },
  {
    id: "fuel-updating",
    title: "Fuel Payments Are Updating",
    category: "Fuel Payments",
    views: "27K views",
    youtubeId: "qvMzPXRJuac",
  },
  {
    id: "have-you-upgraded",
    title: "Have You Upgraded Your Fleet?",
    category: "Platform",
    views: "24K views",
    youtubeId: "YBpNHWwcmr8",
  },
  {
    id: "india-ready",
    title: "Is India Ready for Contactless Fuel Payments?",
    category: "Company",
    views: "9.5K views",
    youtubeId: "Art2FARqdKc",
  },
  {
    id: "how-do-you-manage",
    title: "How Do You Manage Your Vehicles?",
    category: "Fleet Management",
    views: "5.7K views",
    youtubeId: "q8FTt0BkNWI",
  },
  {
    id: "driverless",
    title: "Driverless Payment System for Vehicles in India",
    category: "Field Demo",
    views: "3.3K views",
    youtubeId: "C9fI6nVJipM",
  },
  {
    id: "upgrade-business",
    title: "Have You Upgraded Your Business?",
    category: "Company",
    views: "3.0K views",
    youtubeId: "l4A5PS65n4o",
  },
];

const CompanyVideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<CompanyVideo>(COMPANY_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const programmaticScroll = useRef(false);

  const handleSelect = (video: CompanyVideo) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  // Only the mobile layout is a sliding rail; desktop keeps the grid.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Slide to the next video every 3 seconds, looping back at the end.
  useEffect(() => {
    if (!isMobile || userTookOver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % COMPANY_VIDEOS.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isMobile, userTookOver]);

  useEffect(() => {
    if (!isMobile) return;
    const rail = railRef.current;
    const card = rail?.children[slide] as HTMLElement | undefined;
    if (!rail || !card) return;
    programmaticScroll.current = true;
    rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
    window.setTimeout(() => {
      programmaticScroll.current = false;
    }, 700);
  }, [slide, isMobile]);

  // Stop auto-sliding as soon as the visitor scrolls the rail themselves.
  useEffect(() => {
    if (!isMobile) return;
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      if (programmaticScroll.current) return;
      setUserTookOver(true);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <section id="company-videos" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Watch Paytap in Action
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Real product demos, NFC fuel payments at the pump, and owner walkthroughs.
            </p>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground/30 md:self-auto"
          >
            <Youtube className="h-4 w-4" />
            View all on YouTube
          </a>
        </div>

        {/* Featured Video Player */}
        <div className="overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-sm">
          <div className="relative aspect-video w-full bg-primary">
            {isPlaying ? (
              <iframe
                key={activeVideo.youtubeId}
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
                <img
                  src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
                  alt={activeVideo.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-35"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Play ${activeVideo.title}`}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
                  >
                    <Play className="ml-1 h-7 w-7 fill-current" />
                  </button>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                    {activeVideo.category} · {activeVideo.views}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
                    {activeVideo.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Gallery — sliding rail on mobile, grid on larger screens */}
        <div
          ref={railRef}
          className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
        >
          {COMPANY_VIDEOS.map((video) => {
            const isSelected = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelect(video)}
                className={`group w-[78%] shrink-0 snap-center flex flex-col overflow-hidden rounded-xl border text-left transition-all sm:w-auto sm:shrink ${
                  isSelected
                    ? "border-accent bg-card ring-1 ring-accent"
                    : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-primary">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm transition-transform group-hover:scale-105">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-primary/85 px-1.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                    {video.views}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {video.category}
                  </p>
                  <h4 className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
                    {video.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyVideoGallery;
