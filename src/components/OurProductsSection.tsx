
import { ArrowUpRight, Truck, Receipt, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const products = [
  {
    id: 1,
    name: "Myfleet AI",
    description: "Automated expense control for fleets. Zero manual reconciliation.",
    icon: Truck,
    link: "https://www.myfleetai.in",
    gradient: "from-primary to-accent",
  },
  {
    id: 2,
    name: "ExpensePro",
    description: "Real-time spend visibility. Instant reimbursements.",
    icon: Receipt,
    link: "https://www.expensepro.in",
    gradient: "from-accent to-primary",
  },
  {
    id: 3,
    name: "Paytap SafeVaultz",
    description: "Encrypted storage for cards, credentials, and documents.",
    icon: Shield,
    link: "#",
    gradient: "from-primary to-accent",
  },
  {
    id: 4,
    name: "Paytap Kids Pay",
    description: "Controlled spending for children. Parents stay in charge.",
    icon: Users,
    link: "#",
    gradient: "from-accent to-primary",
  },
];

const OurProductsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="our-products" className="py-24 md:py-32 px-6 md:px-12 bg-background">
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
          {products.map((product, index) => (
            <a
              key={product.id}
              href={product.link}
              target={product.link !== "#" ? "_blank" : undefined}
              rel={product.link !== "#" ? "noopener noreferrer" : undefined}
              className="group relative bg-card rounded-2xl p-5 sm:p-8 md:p-10 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6`}>
                <product.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Link indicator */}
              <div className="flex items-center text-primary font-medium text-sm">
                <span>Learn more</span>
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProductsSection;
