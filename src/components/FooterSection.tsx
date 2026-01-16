
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, X, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import paytapFooterLogo from "@/assets/paytap-footer-logo.png";

const FooterSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleRedirect = () => {
    navigate('/checkout');
  };
  
  return (
    <footer className="bg-paytap-navy text-white py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-paytap-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-paytap-dark/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={paytapFooterLogo} alt="Paytap" className="h-10 w-auto" />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91 9900010964</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@paytap.co.in</span>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              <p className="mb-2">Paytap is a product of</p>
              <p className="font-medium text-gray-400 mb-1">Drivetap Innovation India Private Limited</p>
              <p className="mb-1">No 1 Level 15 UB City Concorde Tower 1</p>
              <p className="mb-1">Vittal Mallya Road Rajbhavan</p>
              <p className="mb-1">Bengaluru 560001</p>
              <p>GSTIN: 29AALCD4626M1Z3</p>
            </div>
          </div>
          
          {/* Get Paytap */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Get Paytap</h4>
            <div className="space-y-4">
              <button 
                className="w-full bg-paytap-light hover:bg-paytap-dark text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleRedirect}
              >
                Order Your Paytap
              </button>
              <div className="bg-paytap-dark/50 backdrop-blur-sm p-4 rounded-xl border border-paytap-dark">
                <p className="text-gray-300 text-sm leading-relaxed">
                  ✨ Stick it once, use it everywhere
                  <br />
                  🚀 Setup in 5 minutes
                  <br />
                  🔒 Bank-grade security
                </p>
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.links.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.links.contact')}</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.terms')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.shipping')}</span>
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refunds" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.cancellation')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social & Newsletter */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white">Stay Connected</h4>
            <p className="text-gray-300 mb-4">Follow us for updates and tips</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="#" className="w-12 h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-xl flex items-center justify-center transition-all duration-300 group">
                <X className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Youtube className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/showcase/paytap-india/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
            
            {/* Newsletter signup */}
            <div className="bg-paytap-dark/50 backdrop-blur-sm p-4 rounded-xl border border-paytap-dark">
              <h5 className="font-semibold mb-3 text-white">Get Updates</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 min-w-0 bg-paytap-dark/50 border border-paytap-dark rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-paytap-light focus:ring-1 focus:ring-paytap-light"
                />
                <button className="bg-paytap-light hover:bg-paytap-dark px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-paytap-dark pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} Paytap. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>Made with ❤️ in India</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
