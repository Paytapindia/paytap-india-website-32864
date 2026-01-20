import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import paytapCard from "@/assets/paytap-card-product.png";
import paytapTagSticker from "@/assets/paytap-tag-sticker-v2.png";

const products = [
  {
    id: 1,
    name: "PayTap NFC Tag / Sticker",
    description: "A compact, stick-anywhere NFC tag for everyday payments. Tap to pay at fuel pumps, recharge FASTag tolls, metros, parking & more — fast and secure.",
    price: "₹499",
    mrp: "₹4999",
    image: paytapTagSticker,
    buyLink: "/paytap-sticker",
    isInternal: true
  },
  {
    id: 2,
    name: "PayTap Prepaid Physical Card",
    description: "RuPay-powered expense management solution for corporates and MSMEs",
    price: "₹499",
    mrp: "₹4999",
    image: paytapCard,
    buyLink: "/paytap-card",
    isInternal: true
  }
];

const ProductCarousel = memo(() => {
  const navigate = useNavigate();

  const handleOrderNow = (buyLink: string, isInternal: boolean) => {
    if (isInternal) {
      navigate(buyLink);
    } else {
      window.open(buyLink, '_blank');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full">
              <Card className="bg-card border-border overflow-hidden h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-secondary/50 to-secondary p-4 md:p-6 flex items-center justify-center h-[220px] sm:h-[280px] md:h-[320px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[200px] sm:max-w-[240px] md:max-w-[280px] max-h-[180px] sm:max-h-[240px] md:max-h-[280px] w-auto h-auto object-contain drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 md:p-6 flex flex-col flex-grow min-h-[160px] sm:min-h-[200px]">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-3 md:mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground line-through">{product.mrp}</span>
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
                          {product.price}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleOrderNow(product.buyLink, product.isInternal)}
                        className="bg-paytap-light hover:bg-paytap-dark text-white px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <ShoppingCart className="mr-1.5 md:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        Order Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 w-12 h-12 bg-card border-border hover:bg-secondary text-foreground" />
        <CarouselNext className="hidden md:flex -right-12 lg:-right-16 w-12 h-12 bg-card border-border hover:bg-secondary text-foreground" />
      </Carousel>
      
      {/* Mobile Swipe Hint */}
      <p className="text-center text-muted-foreground text-xs sm:text-sm mt-3 md:mt-4 md:hidden">
        ← Swipe to see more products →
      </p>
    </div>
  );
});

ProductCarousel.displayName = 'ProductCarousel';

export default ProductCarousel;
