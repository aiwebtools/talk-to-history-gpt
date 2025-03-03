import React, { useState } from 'react';
import { type HistoricalFigure } from '@/lib/constants';
import Hero from '@/components/Hero';
import CharacterSelect from '@/components/CharacterSelect';
import ChatInterface from '@/components/ChatInterface';
import Button from '@/components/shared/Button';
import { Clock, Globe } from 'lucide-react';

enum AppState {
  WELCOME,
  SELECT_CHARACTER,
  CHAT,
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [selectedCharacter, setSelectedCharacter] = useState<HistoricalFigure | null>(null);

  const handleStartConversation = () => {
    setAppState(AppState.SELECT_CHARACTER);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCharacterSelect = (character: HistoricalFigure) => {
    setSelectedCharacter(character);
    setAppState(AppState.CHAT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setAppState(AppState.SELECT_CHARACTER);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWelcome = () => {
    setAppState(AppState.WELCOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b border-border">
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
            
            <h1 className="text-2xl font-serif font-medium">
              <span className="text-primary">Talk to</span> History
            </h1>
            
            <span className="text-xs text-muted-foreground ml-2">
              Presented by <a href="https://aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">AiWebTools.Ai</a>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a href="https://aiwebtools.ai" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center gap-2" 
                icon={<Globe size={16} />}
              >
                AIWEBTOOLS.AI
              </Button>
            </a>
            
            <a href="https://timemachinegpt.xyz/" target="_blank" rel="noopener noreferrer">
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
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="container max-w-6xl mx-auto">
          {appState === AppState.WELCOME && (
            <Hero onStartConversation={handleStartConversation} />
          )}

          {appState === AppState.SELECT_CHARACTER && (
            <CharacterSelect onCharacterSelect={handleCharacterSelect} />
          )}

          {appState === AppState.CHAT && selectedCharacter && (
            <ChatInterface 
              character={selectedCharacter}
              onBack={handleBackToSelection}
            />
          )}
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-border bg-card">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
              <span className="text-lg font-serif font-medium ml-2">
                <span className="text-primary">Talk to</span> History
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="https://aiwebtools.ai" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center gap-2" 
                  icon={<Globe size={16} />}
                >
                  AIWEBTOOLS.AI
                </Button>
              </a>
              
              <a href="https://timemachinegpt.xyz/" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2" 
                  icon={<Clock size={16} />}
                >
                  TIME MACHINE GPT
                </Button>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">© 2025 AI WEB TOOLS LLC. All rights reserved.</p>
            <div className="mt-2 flex justify-center items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Experience history through conversation.
              </p>
              <a 
                href="https://aiwebtools.ai/terms-of-services" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
