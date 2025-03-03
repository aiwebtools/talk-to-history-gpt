
import React, { useState, useRef, useEffect } from 'react';
import { type HistoricalFigure, type Message } from '@/lib/constants';
import HistoricalAvatar from './HistoricalAvatar';
import Button from './shared/Button';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  character: HistoricalFigure;
  onBack: () => void;
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  character,
  onBack,
  className,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Greetings! I am ${character.name}. What would you like to know about my life, work, or the time in which I lived?`,
      role: 'assistant',
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: `As ${character.name}, I find your question intriguing. This is a simulated response that would be replaced with a real AI interaction using the historical persona. The integration with an AI service would allow me to respond authentically in my historical voice, drawing from my knowledge, experiences, and the cultural context of my time period. Would you like to know more about any specific aspect of my life or work?`,
        role: 'assistant',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(timestamp));
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto flex flex-col h-full', className)}>
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card rounded-t-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <HistoricalAvatar figure={character} size="sm" />
            <div>
              <h3 className="font-serif font-medium text-lg">{character.name}</h3>
              <p className="text-xs text-muted-foreground">{character.period} • {character.title}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
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
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start gap-3 max-w-full chat-message-appear',
              message.role === 'user' ? 'flex-row-reverse' : ''
            )}
          >
            {message.role === 'assistant' ? (
              <HistoricalAvatar figure={character} size="sm" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
            <div
              className={cn(
                'rounded-xl p-4 max-w-[80%]',
                message.role === 'assistant'
                  ? 'bg-card border border-border'
                  : 'bg-primary text-primary-foreground'
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className={cn(
                'text-xs mt-1',
                message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/70'
              )}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-3">
            <HistoricalAvatar figure={character} size="sm" />
            <div className="bg-card border border-border rounded-xl p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-200"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-400"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card rounded-b-lg">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={character.placeholder}
            className="w-full px-4 py-3 pr-14 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
