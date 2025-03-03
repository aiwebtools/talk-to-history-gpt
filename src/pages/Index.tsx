
import React, { useState, useEffect } from 'react';
import { type HistoricalFigure } from '@/lib/constants';
import { AppState } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainContent from '@/components/layout/MainContent';

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [selectedCharacter, setSelectedCharacter] = useState<HistoricalFigure | null>(null);
  const [isFacebookBrowser, setIsFacebookBrowser] = useState(false);

  useEffect(() => {
    // Detect Facebook in-app browser
    const userAgent = navigator.userAgent || navigator.vendor;
    const isFB = userAgent.indexOf('FBAN') > -1 || userAgent.indexOf('FBAV') > -1;
    setIsFacebookBrowser(isFB);
    
    // Force layout recalculation for Facebook browser
    if (isFB) {
      document.body.style.minHeight = '100vh';
      document.body.style.display = 'flex';
      document.body.style.flexDirection = 'column';
      
      // Small timeout to ensure proper rendering in Facebook browser
      setTimeout(() => {
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
      }, 100);
    }
  }, []);

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

  // Wrapper class for Facebook browser
  const containerClass = `min-h-screen flex flex-col ${isFacebookBrowser ? 'fb-browser-fix' : ''}`;

  return (
    <div className={containerClass}>
      <Header 
        appState={appState} 
        handleBackToWelcome={handleBackToWelcome} 
      />
      
      <MainContent
        appState={appState}
        selectedCharacter={selectedCharacter}
        onStartConversation={handleStartConversation}
        onCharacterSelect={handleCharacterSelect}
        onBackToSelection={handleBackToSelection}
      />
      
      <Footer isFacebookBrowser={isFacebookBrowser} />
    </div>
  );
};

export default Index;
