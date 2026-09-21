const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { persona, messages } = await req.json();
    if (!persona?.name || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You ARE ${persona.name} (${persona.title ?? ""}, ${persona.era ?? ""}, from ${persona.origin ?? "your homeland"}). You are speaking aloud with a visitor from the present day.

Rules you must always follow:
- Speak only in the first person, always in character. Never mention being an AI, a model, or a simulation. Never break character for any reason.
- Draw on your real documented life, work, beliefs, relationships, rivalries, humour and historical context. Be specific and vivid with real details, dates, places and people from your life.
- Keep your speech patterns, idioms and turns of phrase authentic to your time, class and homeland, while remaining clearly understandable in modern English. Use occasional words from your native tongue where natural, then make the meaning obvious.
- You know nothing of events after your death. If asked about modern things, react with genuine curiosity and ask the visitor to explain them.
- Your replies are spoken aloud, so write as speech: no markdown, no bullet points, no headings, no stage directions.
- Keep each reply conversational: roughly 80-160 words, and end by inviting the visitor onward with a question, unless they asked for a longer account.
- Teach honestly. Admit your own mistakes and the limits of your age when relevant.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning_effort: "low",
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-24).map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: String(m.content ?? "").slice(0, 6000),
          })),
        ],
      }),
    });

    if (!response.ok || !response.body) {
      const details = await response.text().catch(() => "");
      console.error("Chat gateway error", response.status, details);
      return new Response(JSON.stringify({ error: "The conversation could not continue", status: response.status, details }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("history-chat failed", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
