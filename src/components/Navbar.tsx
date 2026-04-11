import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Menu, X, ChevronDown, LogIn, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import paytapLogo from "@/assets/paytap-logo-navbar.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = memo(() => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(() => {
    setIsMenuOpen(false);
    setExpandedMobileSection(null);
  }, []);

  const toggleMobileSection = useCallback((section: string) => {
    setExpandedMobileSection(prev => prev === section ? null : section);
  }, []);

  return (
    <header className={`w-full py-3 md:py-4 px-4 md:px-12 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 bg-paytap-dark border-b border-white/[0.06] ${
      isScrolled 
        ? 'shadow-lg border-white/10' 
        : 'shadow-sm'
    }`}>
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 md:gap-3 font-bold text-lg md:text-xl mr-8 md:mr-12 hover:opacity-80 transition-opacity">
          <img 
            src={paytapLogo} 
            alt="Paytap Logo" 
            className="h-12 md:h-14 w-auto"
            loading="eager"
          />
        </Link>
        
        {/* Desktop navigation - enterprise fintech positioning */}
        <nav className="hidden lg:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Platform Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-white/80 hover:text-white transition-colors bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white">
                  {t('nav.platform')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-3 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.platformOverview')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Architecture & capabilities
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/about#platform"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.prepaidInfrastructure')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            PPI & transaction rails
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Solutions Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-white/80 hover:text-white transition-colors bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white ml-6">
                  {t('nav.solutions')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-3 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="https://dashboard.paytap.co.in/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Paytap Vehicle Payment System
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Payment & billing platform
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href="https://dashboard.myfleetai.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Paytap Vehicle Management System
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Fleet & vehicle management
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-white/80 hover:text-white transition-colors bg-transparent h-auto p-0 hover:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-white ml-6">
                  {t('nav.resources')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-3 bg-white">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/how-it-works"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.howItWorks')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Step-by-step guide
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/faq"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.faq')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Common questions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/newsroom"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.newsroom')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Press & updates
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/support"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.support')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Help center
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/security"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {t('nav.compliance')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Security & certifications
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/checkout" className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2">
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
      
      <div className="flex items-center space-x-3 md:space-x-4">
        <LanguageSelector />
                <Button
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="hidden md:inline-flex bg-white/10 hover:bg-white/15 text-white/80 hover:text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 min-h-[36px] border border-white/10"
                >
                  {t('nav.platformLogin')}
                </Button>
        
        {/* Mobile menu button */}
        {/* Mobile Login Button - next to hamburger */}
        <Button
          onClick={() => setIsLoginDialogOpen(true)}
          className="md:hidden bg-paytap-light hover:bg-paytap-light/90 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 min-h-[36px]"
        >
          Login
        </Button>
        
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile menu - enterprise structure */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-100 animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between py-2 px-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">Language</span>
              <LanguageSelector />
            </div>
            
            {/* Platform Section */}
            <div className="border-b border-gray-100">
              <button 
                onClick={() => toggleMobileSection('platform')}
                className="w-full flex items-center justify-between py-3 px-2 text-base font-medium text-gray-700"
              >
                {t('nav.platform')}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'platform' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'platform' && (
                <div className="pb-2 space-y-1">
                  <Link 
                    to="/about" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.platformOverview')}
                  </Link>
                  <Link 
                    to="/about#platform" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.prepaidInfrastructure')}
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Section */}
            <div className="border-b border-gray-100">
              <button 
                onClick={() => toggleMobileSection('solutions')}
                className="w-full flex items-center justify-between py-3 px-2 text-base font-medium text-gray-700"
              >
                {t('nav.solutions')}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'solutions' && (
                <div className="pb-2 space-y-1">
                  <a 
                    href="https://dashboard.paytap.co.in/login" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    Paytap Vehicle Payment System
                  </a>
                  <a 
                    href="https://dashboard.myfleetai.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    Paytap Vehicle Management System
                  </a>
                </div>
              )}
            </div>


            {/* Resources Section */}
            <div className="border-b border-gray-100">
              <button 
                onClick={() => toggleMobileSection('resources')}
                className="w-full flex items-center justify-between py-3 px-2 text-base font-medium text-gray-700"
              >
                {t('nav.resources')}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {expandedMobileSection === 'resources' && (
                <div className="pb-2 space-y-1">
                  <Link 
                    to="/how-it-works" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.howItWorks')}
                  </Link>
                  <Link 
                    to="/faq" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.faq')}
                  </Link>
                  <Link 
                    to="/newsroom" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.newsroom')}
                  </Link>
                  <Link 
                    to="/support" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.support')}
                  </Link>
                  <Link 
                    to="/security" 
                    className="block text-sm text-gray-600 hover:text-paytap-dark py-2 px-4 ml-2"
                    onClick={handleNavClick}
                  >
                    {t('nav.compliance')}
                  </Link>
                </div>
              )}
            </div>

            {/* Pricing Link */}
            <div className="border-b border-gray-100">
              <Link to="/checkout" className="block py-3 px-2 text-base font-medium text-gray-700" onClick={handleNavClick}>
                Pricing
              </Link>
            </div>

            {/* Platform Login Button */}
            <div className="mt-3">
              <Button
                onClick={() => {
                  setIsLoginDialogOpen(true);
                  handleNavClick();
                }}
                className="w-full mt-3 bg-paytap-light hover:bg-paytap-light/90 text-white py-3 rounded-md font-medium transition-colors duration-200 min-h-[48px]"
              >
                {t('nav.platformLogin')}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">For existing customers & partners</p>
            </div>
          </div>
        </div>
      )}

      {/* Login Type Selection Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[380px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">Choose Login Type</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => {
                window.open("https://dashboard.paytap.co.in/login", "_blank");
                setIsLoginDialogOpen(false);
              }}
              className="flex items-center gap-3 w-full p-4 rounded-lg bg-paytap-light hover:bg-paytap-light/90 text-white transition-colors"
            >
              <LogIn className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-sm">Account Login</div>
                <div className="text-xs text-white/70">Paytap Dashboard</div>
              </div>
            </button>
            <button
              onClick={() => {
                window.open("https://business.paytap.co.in/login", "_blank");
                setIsLoginDialogOpen(false);
              }}
              className="flex items-center gap-3 w-full p-4 rounded-lg border border-border hover:bg-accent text-foreground transition-colors"
            >
              <Building2 className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-sm">Business Login</div>
                <div className="text-xs text-muted-foreground">Management Dashboard</div>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
