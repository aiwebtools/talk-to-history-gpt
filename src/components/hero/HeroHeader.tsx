
import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';
import { cn } from '@/lib/utils';

interface HeroHeaderProps {
  onStartClick: () => void;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ onStartClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const highlights = ["Learn from great minds", "Discover the past", "Expand your knowledge", "Experience history", "Travel through time"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight(prev => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="smooth-fade-in divine-spacing relative">
      {/* Divine aura background */}
      <div className="absolute inset-0 -m-20 bg-gradient-radial from-primary/20 via-transparent to-transparent animate-divine-glow pointer-events-none"></div>
      
      {/* SEO-optimized header structure */}
      <header>
        <h5 className="text-sm uppercase tracking-widest text-primary font-medium mb-4 animate-shimmer text-glow">
          Free AI Tools - Time Travel Through Conversation
        </h5>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8 relative">
          Talk to{' '}
          <span 
            className="text-primary relative inline-block transition-all duration-500" 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className={cn(
              "transition-all duration-500 animate-float",
              isHovering ? "text-glow scale-110" : "text-glow-accent"
            )}>
              History
            </span>
            {isHovering && (
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-75 shimmer-effect rounded-full"></span>
            )}
          </span>
        </h1>
        
        <div className="h-12 mb-6">
          <p className="text-2xl sm:text-3xl text-accent animate-float font-serif text-glow-accent">
            {highlights[currentHighlight]}
          </p>
        </div>
      </header>
      
      <section>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          Engage in immersive conversations with historical figures across time using our free AI tool. 
          Learn history directly from Einstein, Marie Curie, Shakespeare and more with AIWEBTOOLS.AI.
        </p>

        <div className="smooth-fade-in animation-delay-400">
          <Button 
            size="lg" 
            onClick={onStartClick} 
            className="min-w-48 h-16 text-xl font-bold divine-button relative overflow-hidden group px-12 py-4"
            aria-label="Start free AI conversation with historical figures"
          >
            <span className="relative z-10 text-white font-serif tracking-wide">Start Free AI Chat</span>
          </Button>
          
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start chatting with historical figures for free using our advanced AI technology. 
            Experience immersive conversations that bring history to life with AIWEBTOOLS.AI.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroHeader;
