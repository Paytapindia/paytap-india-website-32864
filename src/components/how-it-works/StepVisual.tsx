
import { Wallet, Nfc, Smartphone } from 'lucide-react';

interface StepVisualProps {
  visual: string;
  icon: string;
}

const StepVisual = ({ visual, icon }: StepVisualProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'wallet':
        return <Wallet className="w-12 h-12 text-green-600" />;
      case 'nfc':
        return <Nfc className="w-12 h-12 text-purple-600 animate-pulse" />;
      case 'smartphone':
        return <Smartphone className="w-12 h-12 text-orange-600" />;
      default:
        if (icon.startsWith('/') || icon.startsWith('http')) {
          return <img src={icon} alt="Step icon" className="w-12 h-12 object-contain" />;
        }
        return <span className="text-4xl">{icon}</span>;
    }
  };

  const getVisualContent = () => {
    switch (visual) {
      case "tag-installation":
        return (
          <div className="flex flex-col items-center space-y-4">
            {/* Car windshield with tag */}
            <div className="relative">
              <div className="w-32 h-20 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 relative shadow-lg">
                <div className="absolute inset-2 bg-gradient-to-b from-gray-50 to-white rounded border border-gray-200"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-800 rounded-b-lg"></div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-white rounded flex items-center justify-center shadow-md border">
                  <img src={icon} alt="PayTap Tag" className="w-6 h-3 object-contain" />
                </div>
              </div>
            </div>
            
            {/* Alternative placement options */}
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-4 h-5 bg-yellow-400 rounded-sm shadow"></div>
                <span>Keychain</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-7 bg-gray-800 rounded shadow"></div>
                <span>Phone</span>
              </div>
            </div>
          </div>
        );
        
      case "wallet-loading":
        return (
          <div className="flex flex-col items-center space-y-4">
            {/* Digital wallet visualization */}
            <div className="relative">
              <div className="w-24 h-32 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="w-20 h-28 bg-white rounded-xl flex flex-col items-center justify-center p-2">
                  <div className="w-16 h-4 bg-gradient-to-r from-green-600 to-green-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">₹5,000</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 mb-2">
                    <div className="w-4 h-4 bg-orange-500 rounded text-xs flex items-center justify-center text-white font-bold">U</div>
                    <div className="w-4 h-4 bg-blue-500 rounded text-xs flex items-center justify-center">💳</div>
                    <div className="w-4 h-4 bg-green-500 rounded text-xs flex items-center justify-center">🏦</div>
                  </div>
                  
                  <div className="flex gap-1">
                    <div className="bg-green-100 px-1 py-0.5 rounded text-xs text-green-700 font-semibold">RBI</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>
          </div>
        );
        
      case "contactless-payment":
        return (
          <div className="flex flex-col items-center space-y-4">
            {/* POS Terminal */}
            <div className="relative">
              <div className="w-20 h-16 bg-gray-800 rounded-lg flex flex-col items-center justify-center shadow-lg">
                <div className="w-16 h-10 bg-gradient-to-b from-blue-600 to-blue-700 rounded flex items-center justify-center mb-1">
                  <span className="text-white text-xs font-bold">POS</span>
                </div>
                <div className="w-12 h-2 bg-green-400 rounded"></div>
                
                {/* NFC waves animation */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
            
            {/* Usage locations */}
            <div className="grid grid-cols-4 gap-2 text-xs text-center">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-red-500 rounded-lg mb-1 flex items-center justify-center text-white">⛽</div>
                <span className="text-gray-600">Fuel</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-lg mb-1 flex items-center justify-center text-white">🚇</div>
                <span className="text-gray-600">Metro</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-green-500 rounded-lg mb-1 flex items-center justify-center text-white">🛣️</div>
                <span className="text-gray-600">Toll</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-purple-500 rounded-lg mb-1 flex items-center justify-center text-white">🅿️</div>
                <span className="text-gray-600">Park</span>
              </div>
            </div>
          </div>
        );
        
      case "real-time-tracking":
        return (
          <div className="flex flex-col items-center space-y-4">
            {/* Mobile dashboard */}
            <div className="w-20 h-32 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
              <div className="w-16 h-28 bg-white rounded-xl flex flex-col justify-center items-center p-2">
                <div className="w-14 h-3 bg-gradient-to-r from-orange-600 to-orange-700 rounded mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Dashboard</span>
                </div>
                
                <div className="w-full space-y-1 mb-2">
                  <div className="flex justify-between text-xs bg-gray-50 px-1 py-0.5 rounded">
                    <span className="text-gray-600">Fuel</span>
                    <span className="text-red-600 font-bold">₹2K</span>
                  </div>
                  <div className="flex justify-between text-xs bg-gray-50 px-1 py-0.5 rounded">
                    <span className="text-gray-600">Toll</span>
                    <span className="text-red-600 font-bold">₹340</span>
                  </div>
                </div>
                
                <div className="flex items-end gap-1 justify-center mb-1">
                  <div className="w-1 h-4 bg-blue-400 rounded-t"></div>
                  <div className="w-1 h-6 bg-green-400 rounded-t"></div>
                  <div className="w-1 h-3 bg-orange-400 rounded-t"></div>
                  <div className="w-1 h-5 bg-purple-400 rounded-t"></div>
                </div>
                
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Live</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center">
            {renderIcon()}
          </div>
        );
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {getVisualContent()}
    </div>
  );
};

export default StepVisual;
