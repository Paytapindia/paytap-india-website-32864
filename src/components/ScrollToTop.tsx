import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Only fire Google Ads on production domain
    const isProduction = window.location.hostname === 'paytap.co.in';
    if (!isProduction) return;

    // Fire Google Ads/GA4 page view for SPA navigation
    if (window.gtag) {
      window.gtag('config', 'AW-17870924773', {
        'page_path': pathname,
        'page_location': window.location.href
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
