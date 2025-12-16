
import { Fuel, CreditCard, ParkingSquare, Wrench } from "lucide-react";

const useCases = [
  {
    id: 1,
    title: "Fuel Stations",
    description: "Pay for fuel with a simple tap. No more waiting in lines or carrying cash.",
    icon: Fuel
  },
  {
    id: 2,
    title: "Toll Booths",
    description: "Drive through toll plazas seamlessly. Save time on your commute.",
    icon: CreditCard
  },
  {
    id: 3,
    title: "Smart Parking",
    description: "Enter and exit parking lots with ease. Automatic payments, no tickets needed.",
    icon: ParkingSquare
  },
  {
    id: 4,
    title: "Car Service Centers",
    description: "Pay for car service and maintenance hassle-free with Paytap.",
    icon: Wrench
  }
];

const UseCaseSection = () => {
  return (
    <section id="use-cases" className="py-16 px-6 md:px-12 bg-paytap-gray">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Where to Use Paytap</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 text-paytap-dark">
                <useCase.icon size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-500 mt-8 italic">Expanding locations every week!</p>
      </div>
    </section>
  );
};

export default UseCaseSection;
