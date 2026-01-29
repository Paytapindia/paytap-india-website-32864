import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  noIndex?: boolean;
}

const SEO = ({ title, description, keywords, noIndex }: SEOProps) => {
  const { pathname } = useLocation();
  const BASE_URL = "https://paytap.co.in";
  const canonicalUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
  
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
