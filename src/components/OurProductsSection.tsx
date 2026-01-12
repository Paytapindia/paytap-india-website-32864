
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

const OurProductsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="our-products" className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-background to-paytap-dark/5">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
            {t('ourProducts.title')}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {t('ourProducts.subtitle')}
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {products.map((product, index) => {
            const isInternal = product.link.startsWith('/');
            const isExternal = product.link.startsWith('http');
            
            const cardContent = (
              <>
                {/* Icon with navy blue gradient */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-paytap-dark to-paytap-dark/70 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-paytap-dark/20 group-hover:shadow-xl group-hover:shadow-paytap-dark/30 transition-shadow duration-300">
                  <product.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-semibold text-paytap-dark mb-3 group-hover:text-paytap-dark/80 transition-colors text-center">
                  {product.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                  {product.description}
                </p>

                {/* Link indicator with navy blue */}
                <div className="flex items-center justify-center text-paytap-dark font-medium text-sm">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Hover effect with navy blue tint */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-paytap-dark/8 to-paytap-dark/3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </>
            );

            // Card styling with subtle navy blue background
            const cardClassName = "group relative bg-gradient-to-br from-paytap-dark/[0.03] to-paytap-dark/[0.08] backdrop-blur-sm rounded-2xl p-5 sm:p-8 md:p-10 border border-paytap-dark/10 hover:border-paytap-dark/25 transition-all duration-300 hover:shadow-xl hover:shadow-paytap-dark/10 animate-fade-in text-center";

            if (isInternal) {
              return (
                <Link
                  key={product.id}
                  to={product.link}
                  className={cardClassName}
                  style={{ animationDelay: `${index * 0.1}s` }}
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
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
