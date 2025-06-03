
import React from 'react';
import Button from '@/components/shared/Button';
import { Clock, Layers, MessageSquare } from 'lucide-react';

interface FooterProps {
  isFacebookBrowser: boolean;
}

const Footer: React.FC<FooterProps> = ({ isFacebookBrowser }) => {
  return (
    <footer className={`py-4 sm:py-6 px-3 sm:px-6 border-t border-border bg-card ${isFacebookBrowser ? 'fb-footer-fix' : ''}`}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
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
                aria-hidden="true"
              >
                <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 9h-1a7 7 0 0 0-14 0H3a9 9 0 0 0 9 9h.5a9 9 0 0 0 9-9.5" />
              </svg>
            </div>
            <span className="text-lg font-serif font-medium ml-2">
              <span className="text-primary">Talk to</span> History
            </span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
            <a 
              href="https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
              aria-label="Access Talk to History GPT - Free AI Tool"
            >
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2 touch-manipulation" 
                icon={<MessageSquare size={16} />}
              >
                TALK TO HISTORY GPT
              </Button>
            </a>
            
            <a 
              href="https://time-machine-gpt.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
              aria-label="Time Machine GPT - AI Historical Tool"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2 touch-manipulation" 
                icon={<Clock size={16} />}
              >
                TIME MACHINE GPT
              </Button>
            </a>
            
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
              aria-label="AIWEBTOOLS.AI - Free AI Web Tools Collection"
            >
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2 touch-manipulation" 
                icon={<Layers size={16} />}
              >
                MORE FREE AI TOOLS
              </Button>
            </a>
          </nav>
        </div>
        
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2025 AIWEBTOOLS.AI - AI WEB TOOLS LLC. All rights reserved.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Free AI tools for informational, educational, and research purposes only.
            </p>
            <a 
              href="https://aiwebtools.lovable.app/disclaimers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              aria-label="Terms of Service and Disclaimers"
            >
              Terms of Service
            </a>
          </div>
          
          {/* SEO Footer Links */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed">
              <strong>AIWEBTOOLS.AI</strong> - Your premier destination for free AI web tools. 
              Discover innovative artificial intelligence applications including Talk to History, 
              AI chatbots, educational AI tools, and more. Experience the future of AI technology 
              with our collection of free, user-friendly AI tools designed for students, educators, 
              researchers, and AI enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
