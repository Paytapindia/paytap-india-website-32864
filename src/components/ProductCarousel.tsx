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
    image: paytapTagSticker,
    buyLink: "/paytap-sticker",
    isInternal: true
  },
  {
    id: 2,
    name: "PayTap NFC Card",
    description: "Premium contactless prepaid card for seamless payments at 8L+ acceptance points across India.",
    price: "₹299",
    image: paytapCard,
    buyLink: "https://u.payu.in/PAYUMN/7IhlCW7USFZ7",
    isInternal: false
  }
];

const ProductCarousel = () => {
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
                  <div className="relative bg-gradient-to-br from-secondary/50 to-secondary p-6 flex items-center justify-center h-[280px] sm:h-[320px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[240px] sm:max-w-[280px] max-h-[240px] sm:max-h-[280px] w-auto h-auto object-contain drop-shadow-xl"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow min-h-[200px]">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base mb-4 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Button
                        onClick={() => handleOrderNow(product.buyLink, product.isInternal)}
                        className="bg-paytap-light hover:bg-paytap-dark text-white px-6 py-3 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      >
                        <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
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
      <p className="text-center text-muted-foreground text-sm mt-4 md:hidden">
        ← Swipe to see more products →
      </p>
    </div>
  );
};

export default ProductCarousel;
