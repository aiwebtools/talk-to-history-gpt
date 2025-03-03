
import React, { useState } from 'react';
import { HISTORICAL_FIGURES, type HistoricalFigure } from '@/lib/constants';
import HistoricalAvatar from './HistoricalAvatar';
import Button from './shared/Button';
import { cn } from '@/lib/utils';

interface CharacterSelectProps {
  onCharacterSelect: (character: HistoricalFigure) => void;
  className?: string;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onCharacterSelect,
  className,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<HistoricalFigure | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCharacterClick = (character: HistoricalFigure) => {
    setSelectedCharacter(character);
  };

  const handleStartConversation = () => {
    if (selectedCharacter) {
      onCharacterSelect(selectedCharacter);
    }
  };

  const filteredCharacters = HISTORICAL_FIGURES.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="text-center mb-8 smooth-fade-in animation-delay-200">
        <h2 className="text-3xl font-serif font-medium mb-3">Choose a Historical Figure</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the historical figure you'd like to have a conversation with. Each character brings their unique perspective from their time period.
        </p>
      </div>
      
      <div className="mb-8 smooth-fade-in animation-delay-400">
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search historical figures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 smooth-fade-in animation-delay-400">
        {filteredCharacters.map((character, index) => (
          <div
            key={character.id}
            className={cn(
              'p-6 rounded-xl transition-all duration-300 hover-lift',
              selectedCharacter?.id === character.id
                ? 'bg-primary/5 border border-primary/20'
                : 'bg-card border border-border hover:border-primary/20'
            )}
            onClick={() => handleCharacterClick(character)}
          >
            <div className="flex flex-col items-center text-center">
              <HistoricalAvatar
                figure={character}
                size="lg"
                isSelected={selectedCharacter?.id === character.id}
              />
              <h3 className="mt-4 text-xl font-serif font-medium">{character.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{character.period} • {character.title}</p>
              <p className="text-sm">{character.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center smooth-fade-in animation-delay-400">
        <Button
          size="lg"
          onClick={handleStartConversation}
          disabled={!selectedCharacter}
          className="min-w-40"
        >
          Start Conversation
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          {selectedCharacter 
            ? `Ready to chat with ${selectedCharacter.name}`
            : 'Select a character to begin your conversation'}
        </p>
      </div>
    </div>
  );
};

export default CharacterSelect;
