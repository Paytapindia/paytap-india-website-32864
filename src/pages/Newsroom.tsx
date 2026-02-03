
import { memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Download, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/FooterSection";

const pressArticles = [
  // NEW - February 2026 - RuPay NFC Tag Launch (Featured)
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

const featuredArticle = pressArticles.find(a => a.featured) || pressArticles[0];
const otherArticles = pressArticles.filter(a => a !== featuredArticle);

const Newsroom = memo(() => {
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

          <div className="relative max-w-7xl mx-auto px-6 py-8">
            {/* Back button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Hero content */}
            <div className="text-center py-12 md:py-20">
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
                Press & Media
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Paytap Newsroom
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Latest news, press coverage, and media resources about India's innovative contactless payment solution.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <span className="inline-block px-4 py-1.5 bg-paytap-light/10 text-paytap-light text-xs font-semibold uppercase tracking-widest rounded-full mb-8">
              Featured Story
            </span>

            <div className="bg-paytap-navy rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-paytap-navy/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-white/60">{featuredArticle.publication}</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <span className="text-sm text-white/60">{featuredArticle.date}</span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                "{featuredArticle.headline}"
              </h2>
              
              <p className="text-lg text-white/70 max-w-3xl mb-8 leading-relaxed">
                Paytap launches India's first RuPay NFC tag designed for integrated vehicle and enterprise management. 
                From fleet operators to businesses, the contactless solution offers secure, app-free payment experiences 
                backed by RBI-compliant technology—transforming operational expenses across fuel, tolls, and parking.
              </p>

              <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-paytap-light hover:bg-paytap-light/90 text-white rounded-xl px-8 gap-2"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* All Coverage Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <span className="inline-block px-4 py-1.5 bg-paytap-navy/5 text-paytap-navy text-xs font-semibold uppercase tracking-widest rounded-full mb-8">
              Also Featured In
            </span>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-paytap-light/50 hover:shadow-lg hover:shadow-paytap-light/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-foreground">
                      {article.publication}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-paytap-light transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-foreground mb-3 line-clamp-2 group-hover:text-paytap-light transition-colors">
                    {article.headline}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {article.date}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-paytap-navy/5 text-paytap-navy text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
                For Journalists & Media
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Media Resources
              </h2>
              
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Download official brand assets and press materials for your coverage of Paytap.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                <button className="flex items-center justify-center gap-3 bg-card border border-border rounded-xl p-5 hover:border-paytap-light/50 hover:shadow-md transition-all group">
                  <Download className="w-5 h-5 text-paytap-light" />
                  <span className="font-medium text-foreground group-hover:text-paytap-light transition-colors">Logo Pack</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-card border border-border rounded-xl p-5 hover:border-paytap-light/50 hover:shadow-md transition-all group">
                  <Download className="w-5 h-5 text-paytap-light" />
                  <span className="font-medium text-foreground group-hover:text-paytap-light transition-colors">Press Kit PDF</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-card border border-border rounded-xl p-5 hover:border-paytap-light/50 hover:shadow-md transition-all group">
                  <Download className="w-5 h-5 text-paytap-light" />
                  <span className="font-medium text-foreground group-hover:text-paytap-light transition-colors">Company Facts</span>
                </button>
              </div>

              {/* Press Contact */}
              <div className="bg-paytap-navy rounded-2xl p-8 text-white">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-paytap-light" />
                  <h3 className="text-xl font-semibold">Media Inquiries</h3>
                </div>
                <p className="text-white/70 mb-4">
                  For press inquiries, interview requests, or additional information:
                </p>
                <a 
                  href="mailto:press@paytap.co.in" 
                  className="inline-block text-lg font-semibold text-paytap-light hover:underline"
                >
                  press@paytap.co.in
                </a>
                <p className="text-sm text-white/50 mt-3">
                  We typically respond within 24 hours
                </p>
              </div>
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
