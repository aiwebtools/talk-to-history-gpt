
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
    <div className="smooth-fade-in">
      <h5 className="text-sm uppercase tracking-widest text-primary font-medium mb-2">Time Travel Through Conversation</h5>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight mb-6 relative">
        Talk to{' '}
        <span className="text-primary relative inline-block" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <span className={cn("transition-all duration-300", isHovering ? "text-glow" : "")}>
            History
          </span>
          {isHovering && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary opacity-75 shimmer-effect"></span>}
        </span>
      </h1>
      
      <div className="h-8 mb-4">
        <p className="text-xl text-accent animate-float">
          {highlights[currentHighlight]}
        </p>
      </div>
      
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Engage in immersive conversations with historical figures across time. 
        Learn history directly from those who lived it.
      </p>

      <div className="smooth-fade-in animation-delay-200">
        <Button size="lg" onClick={onStartClick} className="min-w-40 relative overflow-hidden group">
          <span className="relative z-10">Start Conversation</span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Start chatting with historical figures for free and experience immersive conversations that bring history to life.
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
