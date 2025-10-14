
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleRedirect = () => {
    window.open('https://dashboard.paytap.co.in/login', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`w-full py-3 md:py-4 px-4 md:px-12 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 md:gap-3 font-bold text-lg md:text-xl mr-8 md:mr-12 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/5767cf4b-96a0-4e43-96e9-ee8b18b10193.png" 
            alt="Paytap Logo" 
            className="h-8 md:h-10 w-auto"
          />
        </Link>
        
        {/* Desktop navigation - simplified */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          <Link to="/checkout" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.orderPaymentTag')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <a href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.howItWorks')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="/#trust" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.whyPaytap')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="https://www.myfleets.in" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.myfleetAi')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <Link to="/faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.faq')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/support" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
            {t('nav.support')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-3 md:space-x-4">
        <LanguageSelector />
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 md:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base min-h-[40px] md:min-h-[44px]"
          onClick={handleRedirect}
        >
          {t('nav.login')}
        </Button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu - optimized for touch */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-100 animate-fade-in">
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between py-2 px-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">Language</span>
              <LanguageSelector />
            </div>
            <Link 
              to="/checkout"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.orderPaymentTag')}
            </Link>
            <a 
              href="/#how-it-works" 
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.howItWorks')}
            </a>
            <a 
              href="/#trust" 
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.whyPaytap')}
            </a>
            <a 
              href="https://www.myfleets.in" 
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.myfleetAi')}
            </a>
            <Link 
              to="/faq" 
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.faq')}
            </Link>
            <Link 
              to="/support" 
              className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.support')}
            </Link>
            <Button 
              variant="outline" 
              className="w-full mt-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px]"
              onClick={() => {
                handleRedirect();
                handleNavClick();
              }}
            >
              {t('nav.login')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
