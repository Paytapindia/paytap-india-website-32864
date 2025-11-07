
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };
  
  return (
    <section id="cta" className="py-24 px-6 md:px-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Social proof badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{t('cta.socialProof.users')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">{t('cta.socialProof.rating')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">{t('cta.socialProof.security')}</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          {t('cta.title')}
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 group"
            onClick={handleRedirect}
          >
            {t('cta.orderNow')}
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="text-blue-100">
            <div className="text-sm opacity-90">✓ {t('cta.features.freeShipping')}</div>
            <div className="text-sm opacity-90">✓ {t('cta.features.support')}</div>
          </div>
        </div>

        {/* Limited time offer */}
        <div className="mt-16 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md mx-auto">
          <div className="text-yellow-400 font-bold text-lg mb-2">🎉 Limited Time Offer</div>
          <div className="text-white">{t('cta.bonus')}</div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
