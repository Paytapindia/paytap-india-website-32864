
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, X, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const FooterSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleRedirect = () => {
    window.open('https://u.payu.in/PAYUMN/KIQlHVfA6z3b', '_blank');
  };
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('footer.company')}
              </h3>
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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleRedirect}
              >
                Order Your Paytap
              </button>
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
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
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.links.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.links.contact')}</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.terms')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.legalLinks.shipping')}</span>
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refunds" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
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
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                <X className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Youtube className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
            
            {/* Newsletter signup */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <h5 className="font-semibold mb-3 text-white">Get Updates</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 min-w-0 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
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
