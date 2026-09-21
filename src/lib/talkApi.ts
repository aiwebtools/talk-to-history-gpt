export type Persona = {
  name: string;
  title?: string;
  era?: string;
  origin?: string;
  voice?: string;
  voiceStyle?: string;
  greeting?: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const HEADERS = {
  'Content-Type': 'application/json',
  apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
};

/** Thrown when the shared community AI allowance is exhausted (402 / 429). */
export class CreditsExhaustedError extends Error {
  readonly isCreditsExhausted = true;
  constructor(message = 'Community AI credits have run out for today.') {
    super(message);
    this.name = 'CreditsExhaustedError';
  }
}

export function isCreditsExhausted(error: unknown): boolean {
  return error instanceof CreditsExhaustedError;
}

async function raise(response: Response, fallback: string): Promise<never> {
  if (response.status === 402 || response.status === 429) {
    throw new CreditsExhaustedError();
  }
  let message = fallback;
  try {
    const data = await response.json();
    if (data?.error) message = String(data.error);
  } catch {
    /* keep fallback */
  }
  throw new Error(message);
}


export async function summonPersona(figure: string): Promise<Persona> {
  const response = await fetch(`${BASE}/history-persona`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ figure }),
  });
  if (!response.ok) {
    await raise(response, 'That soul could not be reached. Try another name.');
  }
  return response.json();
}

export async function streamReply(
  persona: Persona,
  messages: ChatMessage[],
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const response = await fetch(`${BASE}/history-chat`, {
    method: 'POST',
    headers: HEADERS,
    signal,
    body: JSON.stringify({
      persona,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok || !response.body) {
    await raise(response, 'The conversation was interrupted. Please try again.');
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const parsed = JSON.parse(payload);
        const delta = parsed?.choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch {
        /* partial chunk, ignore */
      }
    }
  }
}

export async function speak(text: string, persona: Persona, signal?: AbortSignal): Promise<Blob> {
  const response = await fetch(`${BASE}/history-voice`, {
    method: 'POST',
    headers: HEADERS,
    signal,
    body: JSON.stringify({ text, voice: persona.voice, style: persona.voiceStyle }),
  });
  if (!response.ok) {
    await raise(response, 'The voice fell silent. Please try again.');
  }
  return response.blob();
}
