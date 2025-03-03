
import React from 'react';
import Button from '@/components/shared/Button';
import { Clock, Globe, Layers } from 'lucide-react';

interface FooterProps {
  isFacebookBrowser: boolean;
}

const Footer: React.FC<FooterProps> = ({ isFacebookBrowser }) => {
  return (
    <footer className={`py-6 px-4 sm:px-6 border-t border-border bg-card ${isFacebookBrowser ? 'fb-footer-fix' : ''}`}>
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
            <a href="https://www.aiwebtools.ai" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center gap-2" 
                icon={<Layers size={16} />}
              >
                MORE AI TOOLS
              </Button>
            </a>
            
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
          <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
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
  );
};

export default Footer;
