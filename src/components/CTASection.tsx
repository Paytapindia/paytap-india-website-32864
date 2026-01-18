
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTASection = memo(() => {
  const { t } = useTranslation();
  
  const handleRedirect = () => {
    window.open('https://dashboard.paytap.co.in/login', '_blank');
  };
  
  return (
    <section id="cta" className="py-16 md:py-32 px-6 md:px-12 bg-paytap-navy text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-5xl font-semibold mb-4 md:mb-6 leading-tight tracking-tight">
          {t('cta.title')}
        </h2>
        <p className="text-sm md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>
        
        <Button 
          size="lg"
          className="bg-white text-paytap-navy hover:bg-gray-100 px-6 md:px-10 py-5 md:py-6 text-base md:text-lg font-medium rounded-xl shadow-lg transition-all duration-300 group"
          onClick={handleRedirect}
        >
          {t('cta.orderNow')}
          <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-10 text-gray-400 text-xs md:text-sm">
          <span>✓ {t('cta.features.freeShipping')}</span>
          <span>✓ {t('cta.features.support')}</span>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
