import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";

const pressArticles = [
  // March 2026 - MyFleet AI Launch
  { publication: "DailyHunt (MyFleet AI)", url: "https://m.dailyhunt.in/news/india/english/republicnewsindia-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/myfleet+ai+builds+indias+first+vehiclelevel+financial+operating+system+for+fleet+owners-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_09cf84e0dc9811f09fff8ea76b3d216e" },
  // Original coverage - January 2026
  { publication: "DailyHunt", url: "https://profile.dailyhunt.in/drivetap-innovation-india-private-limited" },
  { publication: "Republic News India", url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/" },
  { publication: "Flipboard", url: "https://flipboard.com/@republicnewsind/-contactless-payment-tags-get-their-mome/a-d1YTu6MgT3GJGohBopI6Kg%3Aa%3A3544623556-8421436395%2Frepublicnewsindia.com" },
  { publication: "The Indian Bulletin", url: "https://theindianbulletin.com/contactless-payment-tags-get-their-moment-in-india/" },
  { publication: "RD Times", url: "https://rdtimes.in/contactless-payment-tags-get-their-moment-in-india/" },
  { publication: "Indian Sentinel", url: "https://indiansentinel.in/contactless-payment-tags-get-their-moment-in-india/" },
  { publication: "Abhyuday Times", url: "https://abhyudaytimes.com/contactless-payment-tags-get-their-moment-in-india/" },
  // New coverage - February 2026 - RuPay NFC Tag Launch
  { publication: "DailyHunt", url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/beyond+personal+payments+paytap+debuts+indias+first+rupay+nfc+tag+for+integrated+vehicleenterprise+management-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_77c23bc000b311f1bfed1779c6fd9cb4?sm=Y" },
  { publication: "Wow Entrepreneurs", url: "https://wowentrepreneurs.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "Business Reporter", url: "https://businessreporter.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "Entrepreneur Saga", url: "https://entrepreneursaga.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "Deccan Business", url: "https://deccanbusiness.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "1 Money Mania", url: "https://1moneymania.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "RD Times Biz", url: "https://biz.rdtimes.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "Republic News India Business", url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "The Indian Bulletin Biz", url: "https://biz.theindianbulletin.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "NewsHead Business", url: "https://business.newshead.in/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
  { publication: "Indian Scoops Business", url: "https://business.indianscoops.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/" },
];

const featuredArticles = [
  {
    title: "Beyond Personal Payments: Paytap Debuts India's First RuPay NFC Tag",
    description: "Paytap launches India's first RuPay NFC tag for integrated vehicle enterprise management—transforming fleet payments, fuel transactions, and operational expenses.",
    publication: "Republic News India Business",
    date: "February 3, 2026",
    url: "https://business.republicnewsindia.com/beyond-personal-payments-paytap-debuts-indias-first-rupay-nfc-tag-for-integrated-vehicle-enterprise-management/"
  },
  {
    title: "Contactless Payment Tags Get Their Moment in India",
    description: "India's contactless payment revolution gains momentum as NFC tags transform how businesses handle fleet payments, toll transactions, and operational expenses.",
    publication: "Republic News India",
    date: "January 24, 2026",
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/"
  },
  {
    title: "MyFleet AI Builds India's First Vehicle-Level Financial Operating System",
    description: "Drivetap Innovation India introduces MyFleet AI — a unified vehicle-level operating system that lets fleet owners track, control, and manage all vehicle expenses from fuel to tolls through a single dashboard.",
    publication: "DailyHunt",
    date: "March 4, 2026",
    url: "https://m.dailyhunt.in/news/india/english/republicnewsindia-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/myfleet+ai+builds+indias+first+vehiclelevel+financial+operating+system+for+fleet+owners-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_09cf84e0dc9811f09fff8ea76b3d216e"
  }
];

const PressSection = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Double the articles for seamless infinite scroll
  const marqueeItems = [...pressArticles, ...pressArticles];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Paytap Press Coverage",
    "itemListElement": pressArticles.map((article, index) => ({
      "@type": "NewsArticle",
      "position": index + 1,
      "headline": `Paytap featured in ${article.publication}`,
      "publisher": {
        "@type": "Organization",
        "name": article.publication
      },
      "url": article.url
    }))
  };

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-transparent pointer-events-none" />

      <div className="relative">
        {/* Header Badge */}
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 bg-paytap-navy/5 text-paytap-navy text-xs font-semibold uppercase tracking-[0.2em] rounded-full">
            ✦ In The Newsroom ✦
          </span>
        </div>

        {/* Infinite Marquee */}
        <div className="relative mb-16 group">
          {/* Left fade mask */}
          <div className="absolute left-0 top-0 w-24 md:w-40 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          {/* Right fade mask */}
          <div className="absolute right-0 top-0 w-24 md:w-40 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Marquee track */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {marqueeItems.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-8 md:px-12 flex items-center gap-2 group/item"
              >
                <span className="text-lg md:text-xl font-semibold text-paytap-navy/60 hover:text-paytap-navy transition-colors duration-300 whitespace-nowrap">
                  {article.publication}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-paytap-navy/30 group-hover/item:text-paytap-light transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Featured Article Carousel */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <Carousel opts={{ loop: true }} setApi={setApi} className="relative">
            <CarouselContent>
              {featuredArticles.map((article, index) => (
                <CarouselItem key={index}>
                  <div className="bg-paytap-navy rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-paytap-navy/15 relative overflow-hidden">
                    {/* Card background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-paytap-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                      <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
                        Featured Coverage • {article.date}
                      </p>
                      
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                        "{article.title}"
                      </h3>
                      
                      <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        {article.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            size="lg" 
                            className="bg-paytap-light hover:bg-paytap-light/90 text-white rounded-xl px-8 gap-2 shadow-lg shadow-paytap-light/25"
                          >
                            Read Coverage
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                        
                        <Link to="/newsroom">
                          <Button 
                            variant="ghost" 
                            size="lg"
                            className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl px-6 gap-2"
                          >
                            View All Press
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation arrows - positioned outside the card with visible styling */}
            <CarouselPrevious className="-left-4 md:-left-6 lg:-left-8 bg-paytap-navy hover:bg-paytap-navy/80 border-0 text-white shadow-lg" />
            <CarouselNext className="-right-4 md:-right-6 lg:-right-8 bg-paytap-navy hover:bg-paytap-navy/80 border-0 text-white shadow-lg" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
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
      </div>

      {/* Structured Data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  );
});

PressSection.displayName = 'PressSection';

export default PressSection;
