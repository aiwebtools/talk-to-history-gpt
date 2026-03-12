
import React, { useState } from 'react';
import { Clock, Globe, Menu, X, MessageSquare, Layers } from 'lucide-react';
import Button from '@/components/shared/Button';
import { AppState } from '@/lib/types';

interface HeaderProps {
  appState: AppState;
  handleBackToWelcome: () => void;
}

const Header: React.FC<HeaderProps> = ({ appState, handleBackToWelcome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-4 px-4 sm:px-6 border-b border-border">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
              <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 9h-1a7 7 0 0 0-14 0H3a9 9 0 0 0 9 9h.5a9 9 0 0 0 9-9.5" />
            </svg>
          </div>
          
          <div className="flex flex-col items-start">
            <h1 className="text-xl sm:text-2xl font-serif font-medium">
              <span className="text-primary">Talk to</span> History
            </h1>
            <span className="text-xs text-muted-foreground">
              Presented by <a href="https://aiwebtools.lovable.app/?via=aiwebtools" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">AiWebTools.Ai</a>
            </span>
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-primary"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="hidden md:flex items-center gap-3">
          <a href="https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-2" 
              icon={<MessageSquare size={16} />}
            >
              TALK TO HISTORY GPT
            </Button>
          </a>
          
          <a href="https://time-machine-gpt.lovable.app/" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2" 
              icon={<Clock size={16} />}
            >
              TIME MACHINE GPT
            </Button>
          </a>
          
          {appState !== AppState.WELCOME && (
            <button
              onClick={handleBackToWelcome}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-border">
          <div className="flex flex-col space-y-3 px-2">
            <a href="https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2" 
                icon={<MessageSquare size={16} />}
              >
                TALK TO HISTORY GPT
              </Button>
            </a>
            
            <a href="https://time-machine-gpt.lovable.app/" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2" 
                icon={<Clock size={16} />}
              >
                TIME MACHINE GPT
              </Button>
            </a>
            
            <a href="https://www.aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2" 
                icon={<Layers size={16} />}
              >
                MORE AI TOOLS
              </Button>
            </a>
            
            {appState !== AppState.WELCOME && (
              <button
                onClick={handleBackToWelcome}
                className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Home
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
