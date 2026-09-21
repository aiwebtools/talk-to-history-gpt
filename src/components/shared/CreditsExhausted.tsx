import React from 'react';
import { Sparkles, ExternalLink, X } from 'lucide-react';
import Button from '@/components/shared/Button';
import VersionBadge from '@/components/shared/VersionBadge';
import { FALLBACK_TOOLS, externalLinkProps } from '@/lib/externalTools';

interface CreditsExhaustedProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Shown when the shared community AI credits for the in-site historian run out.
 * Offers the external versions of the tool so nobody hits a dead end.
 */
const CreditsExhausted: React.FC<CreditsExhaustedProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm smooth-fade-in">
      <div className="relative w-full max-w-lg divine-card rounded-2xl p-6 sm:p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary">
          <Sparkles size={22} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif mb-3 text-glow-accent">
          Our community credits have run out for today
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Sorry about that — the free in-site voice historian is shared by everyone and today's
          allowance is used up. It refreshes soon. In the meantime, you can keep talking to history
          right now with our other versions below.
        </p>

        <div className="flex flex-col gap-3">
          {FALLBACK_TOOLS.map((tool) => (
            <a key={tool.id} href={tool.url} {...externalLinkProps} className="w-full">
              <Button
                variant={tool.id === 'talk-to-history-chatgpt' ? 'primary' : 'outline'}
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                icon={<ExternalLink size={16} />}
              >
                {tool.name} <VersionBadge version={tool.version} />
              </Button>
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          These open in a new tab. The ChatGPT version is free with any ChatGPT account and
          unlimited with ChatGPT Plus.
        </p>
      </div>
    </div>
  );
};

export default CreditsExhausted;
