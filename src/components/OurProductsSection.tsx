import { memo } from "react";
import { ArrowRight } from "lucide-react";
import paytapIconTp from "@/assets/paytap-icon-tp.png";
import myfleetIcon from "@/assets/myfleet-ai-icon.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "MyFleet AI",
    description: "Automated spend control and reconciliation for fleets. Real-time tracking, route optimization, and intelligent fuel management — all in one platform.",
    image: myfleetIcon,
    link: "https://www.myfleetai.in",
    cta: "Explore MyFleet AI",
  },
  {
    id: 2,
    name: "ExpensePro",
    description: "Real-time expense tracking and reimbursement workflows. Automate approvals, enforce policies, and gain full visibility into corporate spending.",
    image: paytapIconTp,
    link: "https://expensepro.in/",
    cta: "Explore ExpensePro",
  },
];

const OurProductsSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="our-products" className="py-20 md:py-32 px-6 md:px-12 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight mb-3 md:mb-4">
            Our Platform Ecosystem
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            {t('ourProducts.subtitle')}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {products.map((product) => {
            const isExternal = product.link.startsWith('http');
            const isInternal = product.link.startsWith('/');

            const cardContent = (
              <>
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 md:mb-7 shadow-md overflow-hidden bg-white">
                  <img src={product.image} alt={product.name} className="w-10 h-10 md:w-11 md:h-11 object-contain" />
                </div>

                {/* Product name */}
                <h3 className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-5 tracking-tight">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  {product.description}
                </p>

                {/* CTA */}
                <div className="flex items-center text-primary font-semibold text-sm md:text-base group-hover:gap-2 transition-all">
                  <span>{product.cta}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </>
            );

            const cardClassName = "group text-left bg-background border border-primary/[0.08] rounded-2xl p-6 md:p-12 shadow-sm hover:shadow-lg hover:border-primary/[0.15] hover:-translate-y-0.5 transition-all duration-300";

            if (isInternal) {
              return (
                <Link key={product.id} to={product.link} className={cardClassName}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <a
                key={product.id}
                href={product.link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={cardClassName}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
});

OurProductsSection.displayName = 'OurProductsSection';

export default OurProductsSection;
