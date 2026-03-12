
import React, { useState, useCallback } from 'react';
import { Clock, Menu, X, MessageSquare, Layers } from 'lucide-react';
import Button from '@/components/shared/Button';
import { AppState } from '@/lib/types';

interface HeaderProps {
  appState: AppState;
  handleBackToWelcome: () => void;
}

const Header: React.FC<HeaderProps> = ({ appState, handleBackToWelcome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="py-3 sm:py-4 px-4 sm:px-6 border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          
          <div className="flex flex-col items-start min-w-0">
            <h1 className="text-lg sm:text-2xl font-serif font-medium truncate">
              <span className="text-primary">Talk to</span> History
            </h1>
            <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
              Presented by <a href="https://aiwebtools.lovable.app/?via=aiwebtools" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">AiWebTools.Ai</a>
            </span>
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-primary touch-manipulation active:scale-95 transition-transform"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <a href="https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-2 whitespace-nowrap" 
              icon={<MessageSquare size={16} />}
            >
              TALK TO HISTORY GPT
            </Button>
          </a>
          
          <a href="https://time-machine-gpt.lovable.app/" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 whitespace-nowrap" 
              icon={<Clock size={16} />}
            >
              TIME MACHINE GPT
            </Button>
          </a>

          <a href="https://aiwebtools.lovable.app/?via=aiwebtools" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-2 whitespace-nowrap" 
              icon={<Layers size={16} />}
            >
              MORE AI TOOLS
            </Button>
          </a>
          
          {appState !== AppState.WELCOME && (
            <button
              onClick={handleBackToWelcome}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile menu with instant transition */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-3 pt-3 border-t border-border' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-2 px-1">
          <a href="https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt" target="_blank" rel="noopener noreferrer" className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<MessageSquare size={16} />}
            >
              TALK TO HISTORY GPT
            </Button>
          </a>
          
          <a href="https://time-machine-gpt.lovable.app/" target="_blank" rel="noopener noreferrer" className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<Clock size={16} />}
            >
              TIME MACHINE GPT
            </Button>
          </a>
          
          <a href="https://aiwebtools.lovable.app/?via=aiwebtools" target="_blank" rel="noopener noreferrer" className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<Layers size={16} />}
            >
              MORE AI TOOLS
            </Button>
          </a>
          
          {appState !== AppState.WELCOME && (
            <button
              onClick={() => { handleBackToWelcome(); closeMobileMenu(); }}
              className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
