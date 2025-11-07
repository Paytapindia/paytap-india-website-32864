
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleGetTag = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };

  return (
    <section className="relative pt-24 md:pt-28 pb-20 px-4 md:px-12 min-h-screen flex items-center overflow-hidden">
      {/* Mobile-optimized background image with proper centering */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/a12ced0c-e94d-4b5d-ae9d-4173f59ef43d.png" 
          alt="PayTap background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/70 to-blue-100/80"></div>
      </div>

      {/* Simplified animated background elements for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-5 w-48 h-48 md:w-72 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-5 w-48 h-48 md:w-72 md:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center">
          {/* Mobile-optimized badge with more top spacing */}
          <div className="inline-flex items-center gap-2 bg-blue-100/95 backdrop-blur-sm text-blue-700 px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-8 md:mb-10 animate-fade-in border border-blue-200/50 mt-6 md:mt-8">
            <Shield className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-center">{t('hero.badge')}</span>
          </div>

          {/* Mobile-first heading with better spacing */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-gray-900">{t('hero.title')}</span>
          </h1>

          {/* Mobile-optimized description with better readability */}
          <p className="text-gray-700 text-base md:text-xl max-w-xl mx-auto leading-relaxed mb-8 md:mb-12 animate-fade-in bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/30" style={{ animationDelay: '0.4s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Mobile-optimized CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-12 md:mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group min-h-[48px]"
              onClick={handleGetTag}
            >
              {t('hero.orderNow')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex items-center gap-2 text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full border border-white/40">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              <span className="text-sm md:text-lg font-medium">{t('hero.setupTime')}</span>
            </div>
          </div>

          {/* Mobile-optimized trust indicators - only RuPay Network Partner */}
          <div className="flex justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg border border-white/50">
              <Globe className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
              <span className="font-medium text-gray-700 text-xs md:text-sm">{t('hero.rupayPartner')}</span>
            </div>
          </div>
        </div>

        {/* Mobile-optimized stats section */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-20 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-white/40">
            <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">8L+</div>
            <div className="text-gray-700 font-medium text-xs md:text-base">{t('hero.stats.terminals')}</div>
          </div>
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-white/40">
            <div className="text-2xl md:text-4xl font-bold text-blue-700 mb-1 md:mb-2">50K+</div>
            <div className="text-gray-700 font-medium text-xs md:text-base">{t('hero.stats.fleetOwners')}</div>
          </div>
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-white/40">
            <div className="text-2xl md:text-4xl font-bold text-green-600 mb-1 md:mb-2">99.9%</div>
            <div className="text-gray-700 font-medium text-xs md:text-base">{t('hero.stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
