
import React from 'react';

// This component adds custom styles for the ElevenLabs widget
const ElevenLabsWidgetStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Styling for the ElevenLabs widget */
      elevenlabs-convai {
        --convai-accent-color: var(--primary); /* Match the site's primary color */
        --convai-button-color: var(--primary);
        --convai-button-hover-color: var(--accent);
        --convai-button-text-color: white;
        --convai-bubble-size: 60px;
        --convai-border-radius: var(--radius);
        --convai-font-family: 'Inter', sans-serif;
        --convai-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      }

      /* Position the widget button */
      elevenlabs-convai::part(button) {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      elevenlabs-convai::part(button):hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }

      /* Modal styling */
      elevenlabs-convai::part(modal) {
        border-radius: var(--radius);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
      }

      /* Make sure the widget is usable on mobile */
      @media (max-width: 768px) {
        elevenlabs-convai::part(button) {
          bottom: 16px;
          right: 16px;
          --convai-bubble-size: 54px;
        }
      }
    `}</style>
  );
};

export default ElevenLabsWidgetStyles;
