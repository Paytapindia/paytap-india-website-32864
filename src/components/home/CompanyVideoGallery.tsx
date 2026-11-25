import { useState } from "react";
import { Play, Film } from "lucide-react";

interface CompanyVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  youtubeId?: string;
}

const COMPANY_VIDEOS: CompanyVideo[] = [
  {
    id: "live-demo",
    title: "Paytap Tap & Pay Live Demo",
    category: "Product Demo",
    duration: "0:45",
    youtubeId: "ODRQcGWRaiE",
  },
  {
    id: "command-centre",
    title: "Paytap Command Centre Overview",
    category: "Platform",
    duration: "1:30",
  },
  {
    id: "nfc-fuel-pump",
    title: "NFC Fuel Payment at the Pump",
    category: "Field Demo",
    duration: "1:05",
  },
  {
    id: "ai-fleet-manager",
    title: "AI Fleet Manager Walkthrough",
    category: "AI Operations",
    duration: "1:50",
  },
];

const CompanyVideoGallery = () => {
  const [activeVideo, setActiveVideo] = useState<CompanyVideo>(COMPANY_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelect = (video: CompanyVideo) => {
    setActiveVideo(video);
    setIsPlaying(Boolean(video.youtubeId));
  };

  return (
    <section id="company-videos" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Watch Paytap in Action
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Explore product demos, live NFC fuel payments, and walkthroughs of the Paytap platform.
            </p>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {COMPANY_VIDEOS.length} Company Videos
          </span>
        </div>

        {/* Featured Video Player */}
        <div className="overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-sm">
          <div className="relative aspect-video w-full bg-primary">
            {isPlaying && activeVideo.youtubeId ? (
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
                {activeVideo.youtubeId && (
                  <img
                    src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
                    alt={activeVideo.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-35"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  {activeVideo.youtubeId ? (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label={`Play ${activeVideo.title}`}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105"
                    >
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </button>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70">
                      <Film className="h-7 w-7" />
                    </div>
                  )}
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-primary-foreground/70">
                    {activeVideo.category} · {activeVideo.duration}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
                    {activeVideo.title}
                  </h3>
                  {!activeVideo.youtubeId && (
                    <p className="mt-2 text-xs text-primary-foreground/60">
                      Video link coming soon
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Gallery Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANY_VIDEOS.map((video) => {
            const isSelected = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelect(video)}
                className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-accent bg-card ring-1 ring-accent"
                    : "border-border bg-card hover:border-foreground/25"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-primary">
                  {video.youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/95 text-primary-foreground/40">
                      <Film className="h-6 w-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm transition-transform group-hover:scale-105">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-primary/85 px-1.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                    {video.duration}
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