
import StepVisual from './StepVisual';
import { ChevronDown } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  visual: string;
}

interface StepCardProps {
  step: Step;
  isLast: boolean;
}

const StepCard = ({ step, isLast }: StepCardProps) => {
  return (
    <div className="relative flex flex-col items-center w-full max-w-xs md:max-w-sm">
      {/* Mobile-optimized step card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full w-full">
        {/* Step number circle - mobile optimized */}
        <div className="flex justify-center mb-3 md:mb-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-base md:text-lg shadow-lg">
            {step.id}
          </div>
        </div>
        
        {/* Visual content - mobile optimized */}
        <div className={`w-full h-24 md:h-32 bg-gradient-to-br ${step.bgColor} rounded-xl flex items-center justify-center mb-3 md:mb-4 border border-blue-100`}>
          <StepVisual visual={step.visual} icon={step.icon} />
        </div>
        
        {/* Content - mobile optimized */}
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {step.description}
          </p>
        </div>
      </div>
      
      {/* Mobile-first connector - vertical only */}
      {!isLast && (
        <div className="flex justify-center my-3 md:hidden">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-blue-200"></div>
            <ChevronDown className="w-4 h-4 text-blue-300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;
