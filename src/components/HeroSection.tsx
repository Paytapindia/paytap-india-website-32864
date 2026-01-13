import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const productImages = [
  "/lovable-uploads/587d8b46-3adf-481d-8402-06520f747d62.png",
  "/lovable-uploads/933a793e-c69c-4576-8aed-26642c7838b9.png",
  "/lovable-uploads/c9722883-f078-48f8-9515-f0dc60a94e9c.png",
];

const HeroSection = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleCreateAccount = () => {
    window.open("https://dashboard.paytap.co.in/login", "_blank");
  };
  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Large, bold headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in text-balance">
              <span className="text-primary">Smarter Payments</span> for Everyday India.
            </h1>

            {/* Clean subtitle */}
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-fade-in mx-auto lg:mx-0" style={{ animationDelay: '0.2s' }}>
              Create your PayTap account in minutes using your mobile number. Start managing payments, fleet expenses, and more—all in one place.
            </p>

            {/* Primary CTAs - Center aligned and prominent */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[64px]"
                onClick={handleCreateAccount}
              >
                Create Account to Get Started
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                className="bg-paytap-light hover:bg-paytap-dark text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group min-h-[64px]"
                onClick={() => window.open('https://u.payu.in/PAYUMN/7IhlCW7USFZ7', '_blank')}
              >
                Order PayTap Card/Tag Now
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <span className="text-muted-foreground text-sm">
                {t('hero.setupTime')}
              </span>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in space-y-3 mt-6" style={{ animationDelay: '0.4s' }}>
              <div className="text-muted-foreground text-sm tracking-wide">
                PPI-licensed • RBI-compliant • Works at 8L+ terminals
              </div>
              <div className="text-muted-foreground/70 text-xs">
                Built for businesses that operate beyond traditional bank accounts.
              </div>
            </div>
          </div>

          {/* Right side - Product Image Carousel */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              className="w-full max-w-md mx-auto"
            >
              <CarouselContent>
                {productImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-4">
                      <img
                        src={image}
                        alt={`PayTap Product ${index + 1}`}
                        className="w-full h-auto rounded-2xl shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    current === index
                      ? "bg-paytap-dark w-8"
                      : "bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Clean stats section */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-12 mt-12 sm:mt-16 lg:mt-24 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">8L+</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.terminals')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">50K+</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.fleetOwners')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-5xl font-semibold text-foreground mb-1 sm:mb-2 tracking-tight">99.9%</div>
            <div className="text-muted-foreground text-xs sm:text-sm md:text-base">{t('hero.stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
