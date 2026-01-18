
import { memo } from "react";
import { ArrowUpRight, Truck, Receipt, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Myfleet AI",
    description: "Automated expense control for fleets. Zero manual reconciliation.",
    icon: Truck,
    link: "https://www.myfleetai.in",
  },
  {
    id: 2,
    name: "ExpensePro",
    description: "Real-time spend visibility. Instant reimbursements.",
    icon: Receipt,
    link: "https://www.expensepro.in",
  },
  {
    id: 3,
    name: "Paytap SafeVaultz",
    description: "Save in gold and spend securely online—protect your primary bank card details.",
    icon: Shield,
    link: "/safevaults",
  },
  {
    id: 4,
    name: "Paytap Kids Pay",
    description: "Controlled spending for children. Parents stay in charge.",
    icon: Users,
    link: "/kids-pay",
  },
];

const OurProductsSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="our-products" className="py-16 md:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-paytap-dark/5">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-2xl md:text-5xl font-semibold text-foreground mb-3 md:mb-4 tracking-tight">
            {t('ourProducts.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-xl max-w-2xl mx-auto">
            {t('ourProducts.subtitle')}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {products.map((product) => {
            const isInternal = product.link.startsWith('/');
            const isExternal = product.link.startsWith('http');
            
            const cardContent = (
              <>
                {/* Icon with navy blue gradient */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-paytap-dark to-paytap-dark/70 flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg shadow-paytap-dark/20 md:group-hover:shadow-xl md:group-hover:shadow-paytap-dark/30 transition-shadow duration-300">
                  <product.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-2xl font-semibold text-paytap-dark mb-2 md:mb-3 md:group-hover:text-paytap-dark/80 transition-colors text-center">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 text-center">
                  {product.description}
                </p>

                {/* Link indicator with navy blue */}
                <div className="flex items-center justify-center text-paytap-dark font-medium text-xs md:text-sm">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Hover effect with navy blue tint - hidden on mobile for performance */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-paytap-dark/8 to-paytap-dark/3 opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block" />
              </>
            );

            // Card styling with subtle navy blue background
            const cardClassName = "group relative bg-gradient-to-br from-paytap-dark/[0.03] to-paytap-dark/[0.08] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-10 border border-paytap-dark/10 md:hover:border-paytap-dark/25 transition-all duration-300 md:hover:shadow-xl md:hover:shadow-paytap-dark/10 text-center";

            if (isInternal) {
              return (
                <Link
                  key={product.id}
                  to={product.link}
                  className={cardClassName}
                >
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
