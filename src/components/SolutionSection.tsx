
import { Clock, Check, User, Infinity } from "lucide-react";

const features = [
  {
    icon: <Check className="h-8 w-8 text-paytap-light" />,
    title: "Unique Content",
    description: "Create one-of-a-kind content that stands out from the crowd."
  },
  {
    icon: <Clock className="h-8 w-8 text-paytap-light" />,
    title: "Quick Result",
    description: "Get your content in seconds, not hours or days."
  },
  {
    icon: <User className="h-8 w-8 text-paytap-light" />,
    title: "User Friendly",
    description: "Simple interface that anyone can use without training."
  },
  {
    icon: <Infinity className="h-8 w-8 text-paytap-light" />,
    title: "Unlimited Results",
    description: "Generate as many variations as you need for perfect content."
  }
];

const SolutionSection = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16">
          Find an AI Solution For Your Business.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-sm text-gray-600">
          <div className="p-3 hover:text-paytap-light cursor-pointer">Text Generator</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Code Assistant</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Live Chat</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Creative Text</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Grammar Correction</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Essay Lengthener</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Sentence Rewriter</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Query Tool</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Grammar Checker</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Creative Content</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">Language Learning</div>
          <div className="p-3 hover:text-paytap-light cursor-pointer">SEO Improver</div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
