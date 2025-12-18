
import { Button } from "@/components/ui/button";

const CreateBusinessSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <span className="text-sm text-gray-500 mb-2 block">IT'S EASY TO</span>
            <h2 className="text-3xl font-bold mb-6">
              Create your own AI <br />business easily.
            </h2>
            <p className="text-gray-600 mb-6">
              AI solutions make it easy to start your own business and drive growth. Our platform provides all the tools you need to succeed in today's digital marketplace.
            </p>
            <Button className="bg-paytap-light hover:bg-paytap-dark">
              Start AI
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <img 
              src="/lovable-uploads/d1f3c3c1-86a6-47b3-a61e-c548524fd4c1.png" 
              alt="AI Robot" 
              className="max-h-[400px]"
            />
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-gray-600 text-sm mb-2">Empowering businesses through advanced AI solutions and data analytics</p>
            <div className="flex items-center justify-center gap-4">
              <h3 className="text-4xl font-bold">400+</h3>
              <span className="text-sm text-gray-500 text-left">Daily unique<br />visitors</span>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm mb-2">Creating value through innovative technology and strategic insights</p>
            <div className="flex items-center justify-center gap-4">
              <h3 className="text-4xl font-bold">85+</h3>
              <span className="text-sm text-gray-500 text-left">Integrations<br />available</span>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm mb-2">Driving growth and efficiency through custom AI implementations</p>
            <div className="flex items-center justify-center gap-4">
              <h3 className="text-4xl font-bold">120K</h3>
              <span className="text-sm text-gray-500 text-left">Global<br />installs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBusinessSection;
