import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
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
import paytapTagSticker from "@/assets/paytap-tag-sticker.png";

const products = [
  {
    id: 1,
    name: "PayTap NFC Card",
    description: "Premium contactless prepaid card for seamless payments at 8L+ acceptance points across India.",
    price: "₹299",
    image: paytapCard,
    buyLink: "https://u.payu.in/PAYUMN/7IhlCW7USFZ7"
  },
  {
    id: 2,
    name: "PayTap NFC Tag/Sticker",
    description: "Compact, stick-anywhere NFC tag. Tap to pay at fuel pumps, tolls, metros, and more.",
    price: "₹199",
    image: paytapTagSticker,
    buyLink: "https://u.payu.in/PAYUMN/7IhlCW7USFZ7"
  }
];

const ProductCarousel = () => {
  const handleOrderNow = (buyLink: string) => {
    window.open(buyLink, '_blank');
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
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
              <Card className="bg-card border-border overflow-hidden h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Product Image */}
                  <div className="relative bg-gradient-to-br from-secondary/50 to-secondary p-6 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain drop-shadow-xl"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-6 flex flex-col flex-grow">
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
                        onClick={() => handleOrderNow(product.buyLink)}
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
