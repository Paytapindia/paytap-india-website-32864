import { memo } from "react";
import { ExternalLink, Newspaper } from "lucide-react";

const pressArticles = [
  {
    publication: "DailyHunt",
    url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/contactless+payment+tags+get+their+moment+in+india-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_c197b3e0f6ba11f0bd74e7fbabd93a25?sm=Y",
  },
  {
    publication: "Republic News India",
    url: "https://republicnewsindia.com/contactless-payment-tags-get-their-moment-in-india/",
  },
  {
    publication: "Flipboard",
    url: "https://flipboard.com/@republicnewsind/-contactless-payment-tags-get-their-mome/a-d1YTu6MgT3GJGohBopI6Kg%3Aa%3A3544623556-8421436395%2Frepublicnewsindia.com",
  },
  {
    publication: "The Indian Bulletin",
    url: "https://theindianbulletin.com/contactless-payment-tags-get-their-moment-in-india/",
  },
  {
    publication: "RD Times",
    url: "https://rdtimes.in/contactless-payment-tags-get-their-moment-in-india/",
  },
  {
    publication: "Indian Sentinel",
    url: "https://indiansentinel.in/contactless-payment-tags-get-their-moment-in-india/",
  },
  {
    publication: "Abhyuday Times",
    url: "https://abhyudaytimes.com/contactless-payment-tags-get-their-moment-in-india/",
  },
];

const PressSection = memo(() => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Media Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Paytap in the News
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Featured in leading Indian publications for revolutionizing contactless payments
          </p>
        </div>

        {/* Press Article Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {pressArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read Paytap coverage on ${article.publication}`}
              className="group relative bg-card border border-border/50 rounded-xl p-5 md:p-6 
                         hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 
                         transition-all duration-300 hover:-translate-y-1"
            >
              {/* Publication Name */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center 
                               group-hover:bg-primary/20 transition-colors">
                  <Newspaper className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground text-sm md:text-base leading-tight">
                  {article.publication}
                </span>
              </div>

              {/* External Link Indicator */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-primary" />
              </div>
            </a>
          ))}
        </div>

        {/* Article Headline Banner */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Featured Article
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-4">
              "Contactless Payment Tags Get Their Moment in India"
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Paytap's innovative NFC payment tags are transforming how Indian businesses and fleet operators manage everyday transactions with secure, RBI-compliant technology.
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema for Press Coverage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Paytap Media Coverage",
            "description": "News articles featuring Paytap contactless payment solutions",
            "itemListElement": pressArticles.map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "NewsArticle",
                "headline": "Contactless Payment Tags Get Their Moment in India",
                "publisher": {
                  "@type": "Organization",
                  "name": article.publication
                },
                "url": article.url,
                "about": {
                  "@type": "Organization",
                  "name": "Paytap",
                  "url": "https://paytap.co.in"
                }
              }
            }))
          })
        }}
      />
    </section>
  );
});

PressSection.displayName = 'PressSection';

export default PressSection;
