
import { memo } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Paytap has transformed how we manage fleet expenses. Real-time controls and zero cash handling have improved both efficiency and compliance.",
    author: "Priya Sharma",
    role: "Fleet Operator",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    id: 2,
    quote: "From tolls to fuel, our operations now run on one financial system instead of multiple wallets and vendors.",
    author: "Amit Singh",
    role: "Logistics Partner",
    rating: 5,
    avatar: "🚚"
  },
  {
    id: 3,
    quote: "The platform scales with us — started with 5 vehicles, now managing 200+ with the same dashboard. Enterprise-ready from day one.",
    author: "Rajesh Kumar",
    role: "Transport Company Owner",
    rating: 5,
    avatar: "👨‍💼"
  }
];

const TestimonialsSection = memo(() => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-paytap-gray via-white to-white relative overflow-hidden">
      {/* Background decorations - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-20 left-10 w-40 h-40 bg-paytap-light/20 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-paytap-dark/10 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-paytap-gray text-paytap-dark px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            <span>Trusted by Operators Across India</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">
            What Our <span className="text-paytap-light">Users Say</span>
          </h2>
          <p className="text-sm sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their payment experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/80 md:backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-3xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 md:transform md:hover:-translate-y-2 border border-gray-100"
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-3 sm:mb-6">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-paytap-dark rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-0.5 sm:gap-1 mb-3 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-4 sm:mb-8 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-paytap-gray rounded-full flex items-center justify-center text-lg sm:text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-sm sm:text-lg">{testimonial.author}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-10 sm:mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
            <div className="bg-white/60 md:backdrop-blur-sm p-3 sm:p-6 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-3xl font-bold text-paytap-dark mb-1">4.8★</div>
              <div className="text-gray-600 text-[10px] sm:text-sm">Average Rating</div>
            </div>
            <div className="bg-white/60 md:backdrop-blur-sm p-3 sm:p-6 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-3xl font-bold text-paytap-light mb-1">50K+</div>
              <div className="text-gray-600 text-[10px] sm:text-sm">Fleet owners</div>
            </div>
            <div className="bg-white/60 md:backdrop-blur-sm p-3 sm:p-6 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-3xl font-bold text-paytap-dark mb-1">1M+</div>
              <div className="text-gray-600 text-[10px] sm:text-sm">Transactions</div>
            </div>
            <div className="bg-white/60 md:backdrop-blur-sm p-3 sm:p-6 rounded-lg sm:rounded-2xl">
              <div className="text-xl sm:text-3xl font-bold text-paytap-light mb-1">99%</div>
              <div className="text-gray-600 text-[10px] sm:text-sm">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
