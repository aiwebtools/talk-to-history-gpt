
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

interface DisclaimerPopupProps {
  onAgree: () => void;
}

const DisclaimerPopup = ({ onAgree }: DisclaimerPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    // Check if user has already agreed using localStorage
    const agreed = localStorage.getItem('disclaimerAgreed') === 'true';
    setHasAgreed(agreed);
    
    // Show popup after a slight delay for better UX
    if (!agreed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem('disclaimerAgreed', 'true');
    setHasAgreed(true);
    setIsVisible(false);
    onAgree();
  };

  if (hasAgreed || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 rounded-xl overflow-hidden glass-morphism border-2 border-accent/30">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 -z-10"></div>
        
        {/* Close button */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/30 transition-colors text-white"
        >
          <X size={18} />
        </button>
        
        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white text-glow-accent leading-tight">
            Welcome to <span className="text-accent">Talk to History</span>
          </h2>
          
          <div className="space-y-3 text-white/90 text-balance">
            <p className="font-medium">
              By using this application, you acknowledge that:
            </p>
            <ul className="space-y-2 pl-4">
              <li>• Conversations are powered by AI and may not always be historically accurate</li>
              <li>• Historical figures' responses are simulations based on available information</li>
              <li>• This application is for educational and entertainment purposes only</li>
              <li>• Conversations are subject to OpenAI's privacy policy</li>
            </ul>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleAgree} 
              size="lg" 
              className="w-full bg-accent hover:bg-accent/90 text-black font-bold tracking-wide transform transition-transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              I AGREE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
