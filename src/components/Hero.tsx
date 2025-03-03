import React, { useState, useEffect } from 'react';
import Button from './shared/Button';
import { cn } from '@/lib/utils';
interface HeroProps {
  onStartConversation: () => void;
  className?: string;
}
const Hero: React.FC<HeroProps> = ({
  onStartConversation,
  className
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const highlights = ["Learn from great minds", "Discover the past", "Expand your knowledge", "Experience history", "Travel through time"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight(prev => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleStartClick = () => {
    // Open the specified URL in a new window/tab
    window.open('https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt', '_blank');

    // Also call the original onStartConversation function if needed
    // Commenting this out since we're redirecting instead
    // onStartConversation();
  };
  return <div className={cn('text-center max-w-5xl mx-auto px-4', className)}>
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
      </div>

      <div className="smooth-fade-in animation-delay-200">
        <Button size="lg" onClick={handleStartClick} className="min-w-40 relative overflow-hidden group">
          <span className="relative z-10">Start Conversation</span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Start chatting with historical figures for free and experience immersive conversations that bring history to life.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left smooth-fade-in animation-delay-400">
        <div className="p-6 rounded-xl bg-card border border-border hover-lift transition-all duration-500 group">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">Authentic Personalities</h3>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
            Experience conversations with historical figures who maintain their authentic persona,
            complete with period-appropriate language and knowledge.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border hover-lift transition-all duration-500 group">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">Engaging Conversations</h3>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
            Ask questions, seek advice, or simply chat about the experiences and knowledge of
            historical figures in an interactive and engaging way.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border hover-lift transition-all duration-500 group">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors">Educational Experience</h3>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
            Learn history in an immersive and memorable way, gaining insights into historical events
            and perspectives directly from the sources.
          </p>
        </div>
      </div>

      <div className="mt-16 smooth-fade-in animation-delay-600">
        <h3 className="text-2xl font-serif font-medium mb-6">"Those who cannot remember the past are condemned to repeat it." – George Santayana</h3>
        <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300 hover:box-glow">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/eyASGMPLpLM" title="Talk to History Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
        </div>
      </div>
    </div>;
};
export default Hero;