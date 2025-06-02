
import React from 'react';
import FeatureCard from './FeatureCard';

const FeatureSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left smooth-fade-in animation-delay-600 divine-spacing">
      <div className="divine-card p-8 rounded-2xl hover-lift">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-divine">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 text-glow">Authentic Personalities</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Experience conversations with historical figures who maintain their authentic persona,
          complete with period-appropriate language and knowledge.
        </p>
      </div>

      <div className="divine-card p-8 rounded-2xl hover-lift">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white shadow-divine">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 text-glow">Engaging Conversations</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ask questions, seek advice, or simply chat about the experiences and knowledge of
          historical figures in an interactive and engaging way.
        </p>
      </div>

      <div className="divine-card p-8 rounded-2xl hover-lift">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white shadow-divine">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 text-glow">Educational Experience</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Learn history in an immersive and memorable way, gaining insights into historical events
          and perspectives directly from the sources.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;
