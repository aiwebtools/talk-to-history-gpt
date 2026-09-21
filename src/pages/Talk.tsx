import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Volume2, VolumeX, Loader2, Sparkles, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/shared/Button';
import { toast } from '@/hooks/use-toast';
import { speak, streamReply, summonPersona, type ChatMessage, type Persona } from '@/lib/talkApi';

const STORAGE_KEY = 'tth-live-conversation';

const SUGGESTIONS = [
  'Albert Einstein',
  'Cleopatra VII',
  'Leonardo da Vinci',
  'Marie Curie',
  'Napoleon Bonaparte',
  'William Shakespeare',
  'Socrates',
  'Joan of Arc',
  'Nikola Tesla',
  'Harriet Tubman',
];

type Saved = { persona: Persona; messages: ChatMessage[] };

const newId = () => Math.random().toString(36).slice(2);

const Talk: React.FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [figureInput, setFigureInput] = useState('');
  const [input, setInput] = useState('');
  const [summoning, setSummoning] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceOn, setVoiceOn] = useState(true);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved?.persona?.name) {
          setPersona(saved.persona);
          setMessages(saved.messages ?? []);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    if (persona) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ persona, messages }));
    }
  }, [persona, messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    if (persona && !thinking) inputRef.current?.focus();
  }, [persona, thinking]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setSpeakingId(null);
  }, []);

  const playVoice = useCallback(
    async (message: ChatMessage, activePersona: Persona) => {
      stopAudio();
      setSpeakingId(message.id);
      try {
        const blob = await speak(message.content, activePersona);
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setSpeakingId((current) => (current === message.id ? null : current));
        };
        await audio.play();
      } catch (error) {
        setSpeakingId(null);
        toast({
          title: 'Voice unavailable',
          description: error instanceof Error ? error.message : 'Please try again.',
          variant: 'destructive',
        });
      }
    },
    [stopAudio],
  );

  const handleSummon = async (name: string) => {
    const figure = name.trim();
    if (!figure || summoning) return;
    setSummoning(true);
    try {
      const found = await summonPersona(figure);
      const greeting: ChatMessage = {
        id: newId(),
        role: 'assistant',
        content:
          found.greeting?.trim() ||
          `I am ${found.name}. Ask me whatever you wish of my life and my times.`,
      };
      setPersona(found);
      setMessages([greeting]);
      setFigureInput('');
      if (voiceOn) void playVoice(greeting, found);
    } catch (error) {
      toast({
        title: 'Could not reach them',
        description: error instanceof Error ? error.message : 'Please try another name.',
        variant: 'destructive',
      });
    } finally {
      setSummoning(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persona || !input.trim() || thinking) return;
    stopAudio();

    const userMessage: ChatMessage = { id: newId(), role: 'user', content: input.trim() };
    const replyId = newId();
    const history = [...messages, userMessage];

    setMessages([...history, { id: replyId, role: 'assistant', content: '' }]);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setThinking(true);

    let full = '';
    try {
      await streamReply(persona, history, (delta) => {
        full += delta;
        setMessages((prev) =>
          prev.map((m) => (m.id === replyId ? { ...m, content: full } : m)),
        );
      });
      if (voiceOn && full.trim()) {
        void playVoice({ id: replyId, role: 'assistant', content: full }, persona);
      }
    } catch (error) {
      setMessages((prev) => prev.filter((m) => m.id !== replyId || m.content.length > 0));
      toast({
        title: 'The conversation was interrupted',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setThinking(false);
    }
  };

  const handleNewFigure = () => {
    stopAudio();
    setPersona(null);
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-3 px-4 sm:px-6 border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <h1 className="text-base sm:text-xl font-serif truncate">
            <span className="text-primary">Live</span> Conversation
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (voiceOn) stopAudio();
                setVoiceOn((v) => !v);
              }}
              className="p-2 rounded-full hover:bg-muted transition-colors text-primary"
              aria-label={voiceOn ? 'Turn voice off' : 'Turn voice on'}
            >
              {voiceOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            {persona && (
              <button
                onClick={handleNewFigure}
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                New figure
              </button>
            )}
          </div>
        </div>
      </header>

      {!persona ? (
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl text-center smooth-fade-in">
            <h2 className="text-3xl sm:text-5xl font-serif mb-4 text-glow-accent">
              Who from world history would you like to speak to today?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Name anyone who ever lived. They will answer you in their own voice, from their own age.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSummon(figureInput);
              }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <input
                value={figureInput}
                onChange={(e) => setFigureInput(e.target.value)}
                placeholder="e.g. Marcus Aurelius"
                className="flex-1 px-5 py-4 rounded-xl bg-card border border-border text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
                autoFocus
              />
              <Button
                type="submit"
                size="lg"
                className="divine-button"
                isLoading={summoning}
                icon={<Sparkles size={18} />}
              >
                Summon
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((name) => (
                <button
                  key={name}
                  onClick={() => void handleSummon(name)}
                  disabled={summoning}
                  className="px-4 py-2 rounded-full text-sm border border-border bg-card/60 hover:bg-primary/20 hover:border-primary/50 transition-colors disabled:opacity-50"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <>
          <div className="border-b border-border bg-card/40">
            <div className="container max-w-4xl mx-auto px-4 py-3">
              <h2 className="font-serif text-xl">{persona.name}</h2>
              <p className="text-xs text-muted-foreground">
                {[persona.era, persona.title, persona.origin].filter(Boolean).join(' • ')}
              </p>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto">
            <div className="container max-w-4xl mx-auto px-4 py-6 space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex chat-message-appear',
                    message.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-2xl px-5 py-4 max-w-[85%] leading-relaxed whitespace-pre-wrap',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'divine-card text-foreground',
                    )}
                  >
                    {message.content || (
                      <span className="inline-flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-200" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse animation-delay-400" />
                      </span>
                    )}
                    {message.role === 'assistant' && message.content && (
                      <button
                        onClick={() =>
                          speakingId === message.id ? stopAudio() : void playVoice(message, persona)
                        }
                        className="mt-3 flex items-center gap-2 text-xs text-primary hover:text-accent transition-colors"
                      >
                        {speakingId === message.id ? (
                          <>
                            <Square size={12} /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 size={14} /> Hear their voice
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {speakingId && (
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 size={12} className="animate-spin" /> {persona.name} is speaking…
                </p>
              )}
              <div ref={endRef} />
            </div>
          </main>

          <form onSubmit={handleSend} className="border-t border-border bg-card/60 backdrop-blur-sm">
            <div className="container max-w-4xl mx-auto px-4 py-4">
              <div className="relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void handleSend(e);
                    }
                  }}
                  rows={1}
                  placeholder={`Speak to ${persona.name}…`}
                  className="w-full px-5 py-4 pr-14 rounded-xl bg-background border border-border resize-none max-h-40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="absolute right-3 bottom-3 p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40"
                  aria-label="Send message"
                >
                  {thinking ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-center text-muted-foreground">
                For informational, educational and research purposes only. Conversations stay in your browser.
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Talk;
