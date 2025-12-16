
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const handleGetTag = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };

  return (
    <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 min-h-screen flex items-center bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Minimal badge */}
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-8 animate-fade-in tracking-wide">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {t('hero.badge')}
          </div>

          {/* Large, bold headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in text-balance" style={{ animationDelay: '0.1s' }}>
            {t('hero.title')}
          </h1>

          {/* Clean subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Single prominent CTA */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[56px]"
              onClick={handleGetTag}
            >
              {t('hero.orderNow')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <span className="text-muted-foreground text-sm">
              {t('hero.setupTime')}
            </span>
          </div>

          {/* Trust indicator */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-muted-foreground text-sm font-medium tracking-wide">
              {t('hero.rupayPartner')}
            </div>
          </div>
        </div>

        {/* Clean stats section */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-24 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-semibold text-foreground mb-2 tracking-tight">8L+</div>
            <div className="text-muted-foreground text-sm md:text-base">{t('hero.stats.terminals')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-semibold text-foreground mb-2 tracking-tight">50K+</div>
            <div className="text-muted-foreground text-sm md:text-base">{t('hero.stats.fleetOwners')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-5xl font-semibold text-foreground mb-2 tracking-tight">99.9%</div>
            <div className="text-muted-foreground text-sm md:text-base">{t('hero.stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
