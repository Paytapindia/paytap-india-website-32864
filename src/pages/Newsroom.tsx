import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Download, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import FooterSection from "@/components/FooterSection";

const pressArticles = [
  // February 2026 - RuPay NFC Tag Launch (Featured)
  { 
    publication: "Republic News India Business", 
    url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag for Integrated Vehicle Enterprise Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03",
    featured: true
  },
  { 
    publication: "DailyHunt", 
    url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/beyond+personal+payments+paytap+debuts+indias+first+rupay+nfc+tag+for+integrated+vehicleenterprise+management-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_77c23bc000b311f1bfed1779c6fd9cb4?sm=Y",
    headline: "Paytap Debuts India's First RuPay NFC Tag for Enterprise Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "Wow Entrepreneurs", 
    url: "https://wowentrepreneurs.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Paytap Launches RuPay NFC Tag for Vehicle Enterprise Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "Business Reporter", 
    url: "https://businessreporter.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "India's First RuPay NFC Tag for Integrated Fleet Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "Entrepreneur Saga", 
    url: "https://entrepreneursaga.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Paytap's RuPay NFC Tag Transforms Enterprise Payments",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "Deccan Business", 
    url: "https://deccanbusiness.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Paytap Introduces RuPay NFC Tag for Vehicle Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "1 Money Mania", 
    url: "https://1moneymania.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "RuPay NFC Tag Launch by Paytap for Enterprise Fleet",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "RD Times Biz", 
    url: "https://biz.rdtimes.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Paytap's NFC Payment Innovation for Indian Enterprises",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "The Indian Bulletin Biz", 
    url: "https://biz.theindianbulletin.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "India's First RuPay NFC Tag for Integrated Vehicle Management",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "NewsHead Business", 
    url: "https://business.newshead.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Paytap Debuts RuPay NFC Tag for Enterprise Fleet",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  { 
    publication: "Indian Scoops Business", 
    url: "https://business.indianscoops.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Beyond Personal Payments: Paytap's Enterprise NFC Solution",
    date: "February 3, 2026",
    datePublished: "2026-02-03"
  },
  // Original coverage - January 2026
  { 
    publication: "DailyHunt", 
    url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/contactless+payment+tags+get+their+moment+in+india-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_c197b3e0f6ba11f0bd74e7fbabd93a25?sm=Y",
    headline: "Paytap Revolutionizes Fleet Payment Management",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "Republic News India", 
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Contactless Payment Tags Get Their Moment in India",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "Flipboard", 
    url: "https://flipboard.com/@republicnewsind/-contactless-payment-tags-get-their-mome/a-d1YTu6MgT3GJGohBopI6Kg%3Aa%3A3544623556-8421436395%2Frepublicnewsindia.com",
    headline: "The Future of Contactless Payments in India",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "The Indian Bulletin", 
    url: "https://theindianbulletin.com/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Innovative Payment Solution for Seamless Vehicle Transactions",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "RD Times", 
    url: "https://rdtimes.in/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Smart Payment Tags Transform Business Operations",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "Indian Sentinel", 
    url: "https://indiansentinel.in/contactless-payment-tags-get-their-moment-in-india/",
    headline: "NFC Payment Tags Gain Traction in Indian Market",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
  { 
    publication: "Abhyuday Times", 
    url: "https://abhyudaytimes.com/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Paytap: The New Era of Contactless Fleet Payments",
    date: "January 24, 2026",
    datePublished: "2026-01-24"
  },
];

// Featured articles for the carousel
const featuredArticles = [
  {
    publication: "Republic News India Business",
    url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/",
    headline: "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag for Integrated Vehicle Enterprise Management",
    description: "Paytap launches India's first RuPay NFC tag designed for integrated vehicle and enterprise management. From fleet operators to businesses, the contactless solution offers secure, app-free payment experiences backed by RBI-compliant technology.",
    date: "February 3, 2026"
  },
  {
    publication: "Republic News India",
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/",
    headline: "Contactless Payment Tags Get Their Moment in India",
    description: "India's contactless payment revolution gains momentum as NFC tags emerge as a game-changer for businesses. Paytap leads the charge with innovative payment solutions for fleet management and operational expenses.",
    date: "January 24, 2026"
  },
];

const otherArticles = pressArticles.filter(a => !a.featured);

const Newsroom = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Enhanced structured data for SEO with precise timestamps for Google News
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://paytap.co.in"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Newsroom",
            "item": "https://paytap.co.in/newsroom"
          }
        ]
      },
      {
        "@type": "WebPage",
        "name": "Paytap Newsroom - Press Coverage & Media Resources",
        "description": "Latest news, press coverage, and media resources about Paytap's innovative NFC payment tags for Indian businesses and fleet operators.",
        "url": "https://paytap.co.in/newsroom",
        "datePublished": "2026-01-24T10:00:00+05:30",
        "dateModified": "2026-02-03T12:00:00+05:30",
        "publisher": {
          "@type": "Organization",
          "name": "Paytap",
          "logo": {
            "@type": "ImageObject",
            "url": "https://paytap.co.in/paytap-icon-2025.png",
            "width": 512,
            "height": 512
          }
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Press Coverage",
          "numberOfItems": pressArticles.length,
          "itemListElement": pressArticles.map((article, index) => ({
            "@type": "NewsArticle",
            "position": index + 1,
            "headline": article.headline,
            "datePublished": `${article.datePublished}T10:00:00+05:30`,
            "dateModified": `${article.datePublished}T10:00:00+05:30`,
            "author": {
              "@type": "Organization",
              "name": article.publication
            },
            "publisher": {
              "@type": "Organization",
              "name": article.publication
            },
            "url": article.url,
            "about": {
              "@type": "Organization",
              "name": "Paytap"
            },
            "mainEntityOfPage": article.url
          }))
        }
      },
      {
        "@type": "NewsMediaOrganization",
        "name": "Paytap Newsroom",
        "url": "https://paytap.co.in/newsroom",
        "logo": {
          "@type": "ImageObject",
          "url": "https://paytap.co.in/paytap-icon-2025.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://www.linkedin.com/showcase/paytap-india/",
          "https://x.com/paytapindia"
        ],
        "publishingPrinciples": "https://paytap.co.in/newsroom"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Newsroom | Paytap - Contactless Payment Tags India</title>
        <meta name="description" content="Latest news, press coverage, and media resources about Paytap's innovative NFC payment tags. Featured in Republic News, DailyHunt, Flipboard, and more." />
        <link rel="canonical" href="https://paytap.co.in/newsroom" />
        <meta property="og:title" content="Paytap Newsroom - Press Coverage & Media" />
        <meta property="og:description" content="Latest news and press coverage about Paytap's innovative NFC payment solutions for Indian businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paytap.co.in/newsroom" />
        <meta property="og:image" content="https://paytap.co.in/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Paytap NFC Payment Tags - Contactless payments for Indian businesses" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paytap Newsroom" />
        <meta name="twitter:description" content="Latest news and press coverage about Paytap's NFC payment solutions." />
        <meta name="twitter:image" content="https://paytap.co.in/banner.png" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-paytap-navy text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-paytap-light/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8">
            {/* Back button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 md:mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Hero content */}
            <div className="text-center py-8 md:py-20">
              <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-widest rounded-full mb-4 md:mb-6">
                Press & Media
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
                Paytap Newsroom
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
                Latest news, press coverage, and media resources about India's innovative contactless payment solution.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article Carousel */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-paytap-light/10 text-paytap-light text-xs font-semibold uppercase tracking-widest rounded-full mb-6 md:mb-8">
              Featured Stories
            </span>

            <Carousel opts={{ loop: true }} setApi={setApi} className="relative">
              <CarouselContent>
                {featuredArticles.map((article, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-paytap-navy rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 text-white shadow-2xl shadow-paytap-navy/20 relative overflow-hidden">
                      {/* Hide heavy blur effects on mobile for performance */}
                      <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-paytap-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                          <span className="text-xs md:text-sm text-white/60">{article.publication}</span>
                          <span className="w-1 h-1 bg-white/40 rounded-full" />
                          <span className="text-xs md:text-sm text-white/60">{article.date}</span>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                          "{article.headline}"
                        </h2>
                        
                        <p className="text-sm md:text-lg text-white/70 max-w-3xl mb-6 md:mb-8 leading-relaxed">
                          {article.description}
                        </p>

                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          <Button 
                            size="default"
                            className="bg-paytap-light hover:bg-paytap-light/90 text-white rounded-xl px-6 md:px-8 gap-2 text-sm md:text-base"
                          >
                            Read Full Article
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Hide arrows on mobile - users can swipe */}
              <CarouselPrevious className="hidden md:flex -left-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
              <CarouselNext className="hidden md:flex -right-6 bg-paytap-navy hover:bg-paytap-navy/90 border-0 text-white shadow-lg" />
            </Carousel>

            {/* Dot indicators - larger touch target on mobile */}
            <div className="flex justify-center gap-3 mt-4 md:mt-6">
              {featuredArticles.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                    currentSlide === index 
                      ? "bg-paytap-light" 
                      : "bg-paytap-navy/30 hover:bg-paytap-navy/50"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Coverage Grid */}
        <section className="py-12 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-paytap-navy/5 text-paytap-navy text-xs font-semibold uppercase tracking-widest rounded-full mb-6 md:mb-8">
              Also Featured In
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {otherArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-paytap-light/50 hover:shadow-lg hover:shadow-paytap-light/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-xs md:text-sm font-semibold text-foreground">
                      {article.publication}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-paytap-light transition-colors" />
                  </div>
                  
                  <h3 className="text-base md:text-lg font-medium text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-paytap-light transition-colors">
                    {article.headline}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {article.date}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        <FooterSection />
      </main>
    </>
  );
});

Newsroom.displayName = 'Newsroom';

export default Newsroom;
