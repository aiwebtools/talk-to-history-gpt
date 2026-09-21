const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VOICES = [
  "Kore", "Aoede", "Leda", "Zephyr", "Puck", "Charon", "Fenrir", "Orus",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { figure } = await req.json();
    if (!figure || typeof figure !== "string") {
      return new Response(JSON.stringify({ error: "Missing figure" }), {
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

    const prompt = `A visitor wants to speak with this historical person: "${figure}".
Identify who they most likely mean and reply with ONLY a JSON object, no markdown, with these keys:
{
  "name": "the person's full commonly used name",
  "title": "a short descriptor, e.g. Theoretical Physicist",
  "era": "their lifespan, e.g. 1879-1955",
  "origin": "country/region and native language",
  "voice": "one of: ${VOICES.join(", ")}",
  "voiceStyle": "one short sentence describing how they should sound aloud (accent, pace, pitch, temperament)",
  "greeting": "their first spoken line to the visitor, in first person, in character, 2-3 sentences, ending with a question to the visitor"
}
Choose the voice that best matches their gender, age and temperament. If the person cannot be identified at all, use name "Unknown" and leave other fields empty.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        reasoning_effort: "low",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Persona gateway error", response.status, details);
      return new Response(JSON.stringify({ error: "Could not reach the AI", status: response.status, details }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("Persona parse failure", raw.slice(0, 500));
      return new Response(JSON.stringify({ error: "Could not identify that person" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const persona = JSON.parse(match[0]);
    if (!persona.name || persona.name === "Unknown") {
      return new Response(JSON.stringify({ error: "Could not identify that person" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!VOICES.includes(persona.voice)) persona.voice = "Charon";

    return new Response(JSON.stringify(persona), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("history-persona failed", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
