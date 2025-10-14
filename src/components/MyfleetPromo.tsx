import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const MyfleetPromo = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t('myfleet.title')}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                {t('myfleet.description')}
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                  <a 
                    href="https://www.myfleets.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    {t('myfleet.learnMore')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Truck className="w-16 h-16 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyfleetPromo;