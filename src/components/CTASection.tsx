
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();
  
  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };
  
  return (
    <section id="cta" className="py-24 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight tracking-tight">
          {t('cta.title')}
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>
        
        <Button 
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-10 py-6 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 group"
          onClick={handleRedirect}
        >
          {t('cta.orderNow')}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="flex flex-wrap justify-center gap-6 mt-10 text-primary-foreground/70 text-sm">
          <span>✓ {t('cta.features.freeShipping')}</span>
          <span>✓ {t('cta.features.support')}</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
