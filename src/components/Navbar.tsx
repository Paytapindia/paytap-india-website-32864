import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import paytapLogo from "@/assets/paytap-logo-navbar.png";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`w-full py-3 md:py-4 px-4 md:px-12 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 bg-paytap-dark ${
      isScrolled 
        ? 'shadow-lg border-b border-white/10' 
        : 'shadow-sm'
    }`}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 md:gap-3 font-bold text-lg md:text-xl mr-8 md:mr-12 hover:opacity-80 transition-opacity">
          <img 
            src={paytapLogo} 
            alt="Paytap Logo" 
            className="h-12 md:h-14 w-auto"
          />
        </Link>
        
        {/* Desktop navigation - simplified */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-white/80 hover:text-white transition-colors bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white">
                  {t('nav.ourProducts')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-3 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="https://www.myfleetai.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.myfleetAi')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            AI-powered fleet management
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="https://www.expensepro.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.expensePro')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Smart expense management
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/safevaults"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.paytapSafeVaultz')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Secure digital vault
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/kids-pay"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.paytapKidsPay')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Safe payments for kids
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/how-it-works" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
            {t('nav.howItWorks')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </Link>
          <a href="/#trust" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
            {t('nav.whyPaytap')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
          <Link to="/faq" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
            {t('nav.faq')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/support" className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group">
            {t('nav.support')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-3 md:space-x-4">
        <LanguageSelector />
                <Button
                  onClick={() => window.open("https://dashboard.paytap.co.in/login", "_blank")}
                  className="bg-paytap-light hover:bg-paytap-dark text-white px-4 md:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base min-h-[40px] md:min-h-[44px]"
                >
                  {t('nav.login')}
                </Button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
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
              to="/how-it-works" 
              className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.howItWorks')}
            </Link>
            <a 
              href="/#trust" 
              className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.whyPaytap')}
            </a>
            
            <div className="border-b border-gray-100">
              <div className="py-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t('nav.ourProducts')}
              </div>
              <a 
                href="https://www.myfleetai.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-4 ml-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                {t('nav.myfleetAi')}
              </a>
              <a 
                href="https://www.expensepro.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-4 ml-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                {t('nav.expensePro')}
              </a>
              <Link 
                to="/safevaults" 
                className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-4 ml-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                {t('nav.paytapSafeVaultz')}
              </Link>
              <Link 
                to="/kids-pay" 
                className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-4 ml-2 transition-colors min-h-[48px] flex items-center"
                onClick={handleNavClick}
              >
                {t('nav.paytapKidsPay')}
              </Link>
            </div>
            <Link 
              to="/faq" 
              className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.faq')}
            </Link>
            <Link 
              to="/support" 
              className="block text-base font-medium text-gray-700 hover:text-paytap-dark py-3 px-2 border-b border-gray-100 transition-colors min-h-[48px] flex items-center"
              onClick={handleNavClick}
            >
              {t('nav.support')}
            </Link>
            <div className="mt-3">
              <Button
                variant="outline"
                onClick={() => {
                  window.open("https://dashboard.paytap.co.in/login", "_blank");
                  handleNavClick();
                }}
                className="w-full mt-3 border-2 border-paytap-dark text-paytap-dark hover:bg-paytap-dark hover:text-white py-3 rounded-full font-semibold transition-all duration-300 min-h-[48px]"
              >
                {t('nav.login')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
