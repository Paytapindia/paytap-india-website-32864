
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "PayTap has revolutionized my daily commute! No more fumbling for cash at toll booths. Just tap and go - it's that simple!",
    author: "Rahul Mehta",
    role: "Daily Commuter",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    id: 2,
    quote: "As a fleet owner, PayTap saves me hours of reconciliation. Real-time tracking and no cash handling makes my business so much easier.",
    author: "Priya Sharma",
    role: "Fleet Owner",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    id: 3,
    quote: "The convenience is unmatched! From fuel stations to parking lots, one tap handles all my vehicle payments. Highly recommended!",
    author: "Amit Singh",
    role: "Delivery Partner",
    rating: 5,
    avatar: "🚚"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-gradient-to-br from-paytap-gray via-white to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-paytap-light/20 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-paytap-dark/10 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-paytap-gray text-paytap-dark px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            <span>Loved by 50K+ fleet owners</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our <span className="text-paytap-light">Users Say</span>
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their payment experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-paytap-dark rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-paytap-gray rounded-full flex items-center justify-center text-xl sm:text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.author}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-paytap-dark mb-1 sm:mb-2">4.8★</div>
              <div className="text-gray-600 text-xs sm:text-sm">Average Rating</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-paytap-light mb-1 sm:mb-2">50K+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Fleet owners</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">1M+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Transactions</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">99%</div>
              <div className="text-gray-600 text-xs sm:text-sm">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
