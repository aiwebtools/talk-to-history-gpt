
import React from 'react';
import Button from './shared/Button';
import { cn } from '@/lib/utils';

interface HeroProps {
  onStartConversation: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ onStartConversation, className }) => {
  const handleStartClick = () => {
    // Open the specified URL in a new window/tab
    window.open('https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt', '_blank');
    
    // Also call the original onStartConversation function if needed
    // Commenting this out since we're redirecting instead
    // onStartConversation();
  };

  return (
    <div className={cn('text-center max-w-5xl mx-auto px-4', className)}>
      <div className="smooth-fade-in">
        <h5 className="text-sm uppercase tracking-widest text-primary font-medium mb-2">Time Travel Through Conversation</h5>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium leading-tight mb-6">
          Talk to <span className="text-primary relative">History</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Engage in immersive conversations with historical figures from across time. 
          Learn history directly from those who lived it.
        </p>
      </div>

      <div className="smooth-fade-in animation-delay-200">
        <Button size="lg" onClick={handleStartClick} className="min-w-40">
          Start Conversation
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          No account required. Start talking with historical figures right away.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left smooth-fade-in animation-delay-400">
        <div className="p-6 rounded-xl bg-card border border-border hover-lift">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2">Authentic Personalities</h3>
          <p className="text-muted-foreground">
            Experience conversations with historical figures who maintain their authentic persona,
            complete with period-appropriate language and knowledge.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border hover-lift">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2">Engaging Conversations</h3>
          <p className="text-muted-foreground">
            Ask questions, seek advice, or simply chat about the experiences and knowledge of
            historical figures in an interactive and engaging way.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border hover-lift">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-medium mb-2">Educational Experience</h3>
          <p className="text-muted-foreground">
            Learn history in an immersive and memorable way, gaining insights into historical events
            and perspectives directly from the sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
