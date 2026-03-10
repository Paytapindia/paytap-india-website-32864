
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, X, Mail, Phone, MapPin, Building2, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import paytapFooterLogo from "@/assets/paytap-footer-logo.png";

const FooterSection = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-paytap-navy text-white py-12 md:py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-paytap-light/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-paytap-dark/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-6 sm:gap-12 mb-10 md:mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <img 
                src={paytapFooterLogo} 
                alt="Paytap" 
                className="h-8 md:h-10 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Head Office</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-2 ml-6">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">+91 9900010964</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">support@paytap.co.in</span>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed hidden md:block">
              <p className="mb-2">Paytap is a product of:</p>
              <p className="font-medium text-gray-400 mb-1">DriveTap Innovation India Pvt. Ltd.</p>
              <p className="mb-1">Level 15, Concorde Towers</p>
              <p className="mb-1">1 Vittal Mallya Road, UB City</p>
              <p className="mb-1">Bengaluru – 560001</p>
              <p className="mb-2">Karnataka, India</p>
              <p className="mb-1">GSTIN: 29AALCD4626M1Z3</p>
              <p className="text-gray-400">RBI-Authorized PPI Partners</p>
            </div>
          </div>
          
          {/* Platform */}
          <div>
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Platform</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">About Paytap</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">How It Works</span>
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Compliance & Security</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Partner with Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Resources</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/newsroom" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Newsroom</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Documentation</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Support</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refunds" className="text-gray-300 hover:text-paytap-light transition-colors duration-300 flex items-center group text-sm md:text-base">
                  <span className="group-hover:translate-x-1 transition-transform">Refund & Cancellation</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social & Newsletter */}
          <div>
            <h4 className="font-bold text-lg md:text-xl mb-4 md:mb-6 text-white">Stay Connected</h4>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Follow Paytap for platform updates and fintech insights</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
              <a href="https://x.com/paytapindia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 group">
                <X className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Facebook className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Instagram className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Youtube className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a href="https://www.linkedin.com/showcase/paytap-india/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-paytap-dark/50 hover:bg-paytap-light rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-gray-300 group-hover:text-white" />
              </a>
            </div>
            
            {/* Newsletter signup */}
            <div className="bg-paytap-dark/50 p-3 md:p-4 rounded-xl border border-paytap-dark">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h5 className="font-semibold text-white text-sm md:text-base">Get Updates</h5>
                <Link to="/admin-login" className="opacity-[0.15] hover:opacity-30 transition-opacity">
                  <Settings className="h-3.5 w-3.5 text-gray-400" />
                </Link>
              </div>
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
        
        <div className="border-t border-paytap-dark pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Paytap — DriveTap Innovation India Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-400">
            <span>Built in India for regulated, scalable financial infrastructure.</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';

export default FooterSection;
