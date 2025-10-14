
import { Button } from "@/components/ui/button";

const posts = [
  {
    minutes: "10 Min Read",
    date: "JULY 25, 2023",
    title: "The Evolution of AI: Features Shaping Tomorrow's Technology Landscape",
    excerpt: "Explore how artificial intelligence is rapidly evolving and transforming various industries with groundbreaking capabilities."
  },
  {
    minutes: "8 Min Read",
    date: "JULY 19, 2023",
    title: "Future Forward AI: A Spotlight on Online Changing Partners",
    excerpt: "Discover how AI partnerships are reshaping the business landscape and creating new opportunities across sectors."
  },
  {
    minutes: "5 Min Read",
    date: "JULY 12, 2023",
    title: "Empowering Tomorrow: AI Features Redefining the Digital Frontier",
    excerpt: "Learn about the cutting-edge AI features that are revolutionizing how we interact with technology in our daily lives."
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          What's News?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <p className="text-gray-600 mb-6">
              Our blog features insights from industry experts, tips for leveraging AI in your business, and updates on the latest technological innovations.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              View More
            </Button>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            {posts.map((post, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-center">
                  <div className="text-xs text-gray-500">{post.minutes}</div>
                  <div className="text-xs text-gray-500 mt-1">{post.date}</div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                  <a href="#" className="text-purple-600 text-sm font-medium hover:underline">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
