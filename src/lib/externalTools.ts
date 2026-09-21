// Single source of truth for every tool link and its version label.
// Every external destination must carry a version label so users always know
// where a button takes them.

export type ToolVersion = 'INSITE VERSION' | 'CHATGPT VERSION' | 'EXTERNAL TOOL' | 'EXTERNAL SITE';

export type ToolLink = {
  id: string;
  name: string;
  version: ToolVersion;
  url: string;
  external: boolean;
  description: string;
};

export const TALK_LIVE_INSITE: ToolLink = {
  id: 'talk-live-insite',
  name: 'TALK LIVE',
  version: 'INSITE VERSION',
  url: '/talk',
  external: false,
  description: 'Talk to any historical figure with real voice, right here on this site.',
};

export const TALK_TO_HISTORY_CHATGPT: ToolLink = {
  id: 'talk-to-history-chatgpt',
  name: 'TALK TO HISTORY GPT',
  version: 'CHATGPT VERSION',
  url: 'https://chatgpt.com/g/g-kHdIkYTdG-talk-to-history-gpt',
  external: true,
  description: 'Our original custom GPT on ChatGPT. Free with any ChatGPT account.',
};

export const TIME_MACHINE_GPT: ToolLink = {
  id: 'time-machine-gpt',
  name: 'TIME MACHINE GPT',
  version: 'EXTERNAL TOOL',
  url: 'https://time-machine-gpt.lovable.app/',
  external: true,
  description: 'Travel to any year in history with our Time Machine tool.',
};

export const MORE_AI_TOOLS: ToolLink = {
  id: 'more-ai-tools',
  name: 'MORE FREE AI TOOLS',
  version: 'EXTERNAL SITE',
  url: 'https://aiwebtools.lovable.app/?via=aiwebtools',
  external: true,
  description: 'The full AIWEBTOOLS.AI collection of free AI tools.',
};

export const DISCLAIMERS_URL = 'https://aiwebtools.lovable.app/disclaimers';

/** Shown when in-site community AI credits run out for the day. */
export const FALLBACK_TOOLS: ToolLink[] = [TALK_TO_HISTORY_CHATGPT, TIME_MACHINE_GPT, MORE_AI_TOOLS];

export const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' } as const;
