
import React from 'react';
import { AppState, MainProps } from '@/lib/types';
import Hero from '@/components/Hero';
import CharacterSelect from '@/components/CharacterSelect';
import ChatInterface from '@/components/ChatInterface';

const MainContent: React.FC<MainProps> = ({
  appState,
  selectedCharacter,
  onStartConversation,
  onCharacterSelect,
  onBackToSelection
}) => {
  return (
    <main className="flex-1 py-8 sm:py-16 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        {appState === AppState.WELCOME && (
          <Hero onStartConversation={onStartConversation} />
        )}

        {appState === AppState.SELECT_CHARACTER && (
          <CharacterSelect onCharacterSelect={onCharacterSelect} />
        )}

        {appState === AppState.CHAT && selectedCharacter && (
          <ChatInterface 
            character={selectedCharacter}
            onBack={onBackToSelection}
          />
        )}
      </div>
    </main>
  );
};

export default MainContent;
