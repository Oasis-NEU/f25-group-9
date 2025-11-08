import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { dream_id, content } = await req.json().catch(() => ({} as any));
    if (!content) {
      return new Response(JSON.stringify({ error: "Missing content" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,        
        "Content-Type": "application/json",
        
        "HTTP-Referer": "https://your-app.example", 
        "X-Title": "Dream Analyzer",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a dream analysis assistant. Give a short psychological interpretation.",
          },
          { role: "user", content: `Dream description: ${content}` },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return new Response(
        JSON.stringify({ error: "OpenRouter error", detail: text }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const json = await r.json();
    const analysis =
      json?.choices?.[0]?.message?.content ?? "No analysis returned.";

    return new Response(JSON.stringify({ dream_id, analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
