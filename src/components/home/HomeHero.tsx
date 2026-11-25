import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import CommandCentreDemo from "./CommandCentreDemo";

const HomeHero = () => {
  const { openContactForm } = useModal();
  const scrollToExplore = () => {
    document.getElementById("intelligence-layer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground pt-28 pb-12 lg:pt-32 lg:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="mb-6 text-[11px] font-medium tracking-normal text-primary-foreground/60">
              AI-Powered Fleet Operations Platform
            </div>
            <h1 className="max-w-xl text-4xl sm:text-5xl lg:text-[44px] xl:text-5xl font-semibold tracking-normal leading-[1.14] text-balance">
              Your Fleet. One Intelligent Command Centre.
            </h1>
            <p className="mt-5 text-lg font-medium text-primary-foreground/90">
              Run your entire fleet with AI.
            </p>
            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-primary-foreground/60">
              From vehicles and drivers to payments, fuel, GPS and expenses, Paytap brings your
              entire fleet operation into one connected platform — powered by AI built to help you
              understand, manage and grow your business.
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Button size="lg" onClick={openContactForm} className="h-11 rounded-lg bg-accent px-5 text-accent-foreground hover:bg-accent/90">
                Book a Personalised Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" onClick={scrollToExplore} className="h-11 rounded-lg px-3 text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground">
                Explore Paytap
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-primary-foreground/50">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" />Vehicles, Drivers &amp; Trips</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" />Payments, FASTag &amp; Expenses</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" />AI Manager (Elite)</span>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-6"><CommandCentreDemo /></div>
        </div>
      </div>
    </section>
  );
};
export default HomeHero;
