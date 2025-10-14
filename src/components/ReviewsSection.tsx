
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    rating: 5,
    name: "James Land",
    title: "Marketing Director",
    content: "As I've watched the evolution of AI, I've been impressed with how this platform has made it accessible and powerful. It helps my marketing team create content so fast we've doubled our output without adding staff."
  },
  {
    rating: 5,
    name: "James Land",
    title: "CEO at TechFlow",
    content: "I've tested dozens of AI platforms for our content needs, and this one consistently delivers the highest quality results. The speed and accuracy have transformed our content workflow completely."
  },
  {
    rating: 5,
    name: "James Land",
    title: "Product Manager",
    content: "I'm constantly amazed by how well this AI understands our brand voice. We're creating more engaging content in a fraction of the time, and our audience engagement metrics have never been higher."
  }
];

const ReviewsSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">
            Reviews that speak volumes.
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex text-yellow-400 mb-4">
                {"★".repeat(review.rating)}
              </div>
              <h3 className="font-bold mb-1">{review.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{review.title}</p>
              <p className="text-gray-600">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
