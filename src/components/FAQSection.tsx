
import { useState, useEffect } from "react";
import FAQCategory from "./FAQCategory";
import { faqSections } from "@/data/faqData";
import {
  Lightbulb,
  Rocket,
  CreditCard,
  ShieldCheck,
  Settings,
  Building2,
  Wrench,
  Headphones,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb size={24} />,
  Rocket: <Rocket size={24} />,
  CreditCard: <CreditCard size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Settings: <Settings size={24} />,
  Building2: <Building2 size={24} />,
  Wrench: <Wrench size={24} />,
  Headphones: <Headphones size={24} />,
};

const FAQSection = () => {
  const [activeSection, setActiveSection] = useState(faqSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    faqSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 px-4 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Know About PayTap
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read through this guide from top to bottom — by the end, you'll understand exactly how PayTap works, why it's safe, and how to get started.
          </p>
        </div>

        {/* Mobile: Horizontal scrollable chips */}
        <div className="lg:hidden sticky top-16 z-30 bg-background py-3 -mx-4 px-4 border-b mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {faqSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{iconMap[s.icon]}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop: Sticky sidebar nav */}
          <nav className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-1">
              {faqSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5 flex-shrink-0">{iconMap[s.icon]}</span>
                  {s.title}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-12">
            {faqSections.map((s) => (
              <FAQCategory
                key={s.id}
                sectionId={s.id}
                title={s.title}
                description={s.description}
                icon={iconMap[s.icon]}
                faqs={s.faqs}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
