
import React, { useState } from 'react';
import { type HistoricalFigure } from '@/lib/constants';
import Hero from '@/components/Hero';
import CharacterSelect from '@/components/CharacterSelect';
import ChatInterface from '@/components/ChatInterface';

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
    // Smooth scroll to top when transitioning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCharacterSelect = (character: HistoricalFigure) => {
    setSelectedCharacter(character);
    setAppState(AppState.CHAT);
    // Smooth scroll to top when transitioning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setAppState(AppState.SELECT_CHARACTER);
    // Smooth scroll to top when transitioning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWelcome = () => {
    setAppState(AppState.WELCOME);
    // Smooth scroll to top when transitioning
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-border">
        <div className="container max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo */}
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
            
            {/* Title */}
            <h1 className="text-2xl font-serif font-medium">
              <span className="text-primary">Talk to</span> History
            </h1>
            
            {/* Presented by text */}
            <span className="text-xs text-muted-foreground ml-2">
              Presented by <a href="https://aiwebtools.ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">AiWebTools.Ai</a>
            </span>
          </div>
          
          {appState !== AppState.WELCOME && (
            <button
              onClick={handleBackToWelcome}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
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

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border bg-card">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Talk to History. All rights reserved.</p>
          <p className="mt-1">
            Experience history through conversation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
