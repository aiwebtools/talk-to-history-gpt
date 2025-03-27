
import React, { useEffect } from 'react';

// This component is responsible for configuring the ElevenLabs widget
const ElevenLabsWidget: React.FC = () => {
  useEffect(() => {
    // Initialize the ElevenLabs widget with the API key
    if (window.ElevenLabsConvAI) {
      window.ElevenLabsConvAI.init({
        apiKey: 'sk_d4ba415b39332fdbfc89f2ee1eb32967ed650b6c1b71b4a2'
      });
    } else {
      // If the widget hasn't loaded yet, wait for it
      const checkForWidget = setInterval(() => {
        if (window.ElevenLabsConvAI) {
          window.ElevenLabsConvAI.init({
            apiKey: 'sk_d4ba415b39332fdbfc89f2ee1eb32967ed650b6c1b71b4a2'
          });
          clearInterval(checkForWidget);
        }
      }, 1000);

      // Clean up interval
      return () => clearInterval(checkForWidget);
    }
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ElevenLabsWidget;

// Add TypeScript declaration for the ElevenLabs widget
declare global {
  interface Window {
    ElevenLabsConvAI?: {
      init: (config: { apiKey: string }) => void;
    };
  }
}
