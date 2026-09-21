
import React, { useState, useCallback } from 'react';
import { Clock, Menu, X, MessageSquare, Layers, Mic } from 'lucide-react';
import Button from '@/components/shared/Button';
import { AppState } from '@/lib/types';
import VersionBadge from '@/components/shared/VersionBadge';
import { MORE_AI_TOOLS, TALK_LIVE_INSITE, TALK_TO_HISTORY_CHATGPT, TIME_MACHINE_GPT, externalLinkProps } from '@/lib/externalTools';

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
      <div className="container max-w-7xl mx-auto flex justify-between items-center gap-4">
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
              Presented by <a href={MORE_AI_TOOLS.url} {...externalLinkProps} className="font-medium hover:text-primary transition-colors">AiWebTools.Ai <VersionBadge version={MORE_AI_TOOLS.version} /></a>
            </span>
          </div>
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          className="xl:hidden flex items-center justify-center p-2 rounded-md text-primary touch-manipulation active:scale-95 transition-transform"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
          <a href={TALK_LIVE_INSITE.url}>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1.5 whitespace-nowrap px-2.5 text-xs"
              icon={<Mic size={16} />}
            >
              {TALK_LIVE_INSITE.name} <VersionBadge version={TALK_LIVE_INSITE.version} />
            </Button>
          </a>

          <a href={TALK_TO_HISTORY_CHATGPT.url} {...externalLinkProps}>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-1.5 whitespace-nowrap px-2.5 text-xs" 
              icon={<MessageSquare size={16} />}
            >
              {TALK_TO_HISTORY_CHATGPT.name} <VersionBadge version={TALK_TO_HISTORY_CHATGPT.version} />
            </Button>
          </a>

          <a href={TIME_MACHINE_GPT.url} {...externalLinkProps}>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 whitespace-nowrap px-2.5 text-xs" 
              icon={<Clock size={16} />}
            >
              {TIME_MACHINE_GPT.name} <VersionBadge version={TIME_MACHINE_GPT.version} />
            </Button>
          </a>

          <a href={MORE_AI_TOOLS.url} {...externalLinkProps}>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-1.5 whitespace-nowrap px-2.5 text-xs" 
              icon={<Layers size={16} />}
            >
              MORE AI TOOLS <VersionBadge version={MORE_AI_TOOLS.version} />
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
        className={`xl:hidden overflow-hidden transition-all duration-200 ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 mt-3 pt-3 border-t border-border' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-2 px-1">
          <a href={TALK_LIVE_INSITE.url} className="w-full" onClick={closeMobileMenu}>
            <Button
              variant="secondary"
              size="sm"
              className="w-full flex items-center justify-center gap-2 touch-manipulation"
              icon={<Mic size={16} />}
            >
              {TALK_LIVE_INSITE.name} <VersionBadge version={TALK_LIVE_INSITE.version} />
            </Button>
          </a>

          <a href={TALK_TO_HISTORY_CHATGPT.url} {...externalLinkProps} className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<MessageSquare size={16} />}
            >
              {TALK_TO_HISTORY_CHATGPT.name} <VersionBadge version={TALK_TO_HISTORY_CHATGPT.version} />
            </Button>
          </a>
          
          <a href={TIME_MACHINE_GPT.url} {...externalLinkProps} className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<Clock size={16} />}
            >
              {TIME_MACHINE_GPT.name} <VersionBadge version={TIME_MACHINE_GPT.version} />
            </Button>
          </a>
          
          <a href={MORE_AI_TOOLS.url} {...externalLinkProps} className="w-full" onClick={closeMobileMenu}>
            <Button 
              variant="primary" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 touch-manipulation" 
              icon={<Layers size={16} />}
            >
              MORE AI TOOLS <VersionBadge version={MORE_AI_TOOLS.version} />
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
