
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
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-gradient-to-br from-blue-50 via-purple-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Loved by 50K+ fleet owners</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their payment experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600 text-sm">Fleet owners</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-gray-600 text-sm">Transactions</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600 text-sm">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
