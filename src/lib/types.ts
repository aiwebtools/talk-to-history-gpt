
import { type HistoricalFigure } from '@/lib/constants';

export enum AppState {
  WELCOME,
  SELECT_CHARACTER,
  CHAT,
}

export interface MainProps {
  appState: AppState;
  selectedCharacter: HistoricalFigure | null;
  onStartConversation: () => void;
  onCharacterSelect: (character: HistoricalFigure) => void;
  onBackToSelection: () => void;
}
