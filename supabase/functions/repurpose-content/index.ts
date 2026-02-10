import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { content, formats } = await req.json();
    
    if (!content || !formats || formats.length === 0) {
      return new Response(JSON.stringify({ error: "Content and formats are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const formatDescriptions: Record<string, string> = {
      twitter: "a Twitter/X thread of 5-10 tweets. Each tweet should be under 280 characters. Number them. Include relevant hashtags.",
      linkedin: "a professional LinkedIn post. Include a hook, value-driven body, and a call to action. Use line breaks for readability.",
      instagram: "3 Instagram captions with emojis, hashtags, and a call to action. Separate each caption with '---'.",
      facebook: "an engaging Facebook post with a conversational tone, emojis, and a question to drive engagement.",
      email: "an email newsletter section with a compelling subject line, preview text, and body content. Format with 'Subject:', 'Preview:', and 'Body:' labels.",
      bullets: "a bullet-point summary of the key takeaways. Use • for each point. Include 5-8 concise points.",
    };

    const formatInstructions = formats
      .map((f: string) => `### ${f.toUpperCase()}\n${formatDescriptions[f] || `Content formatted for ${f}`}`)
      .join("\n\n");

    const systemPrompt = `You are a professional content repurposing specialist. Transform the given content into the requested formats. Each format should be optimized for its platform while maintaining the original message and tone. Output each format clearly separated with the format name as a header using ### FORMAT_ID syntax.`;

    const userPrompt = `Repurpose the following content into these formats:\n\n${formatInstructions}\n\n---\nORIGINAL CONTENT:\n${content}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits in Settings → Workspace → Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const fullResponse = data.choices?.[0]?.message?.content || "";

    // Parse response into format sections
    const results: Record<string, string> = {};
    for (const formatId of formats) {
      const regex = new RegExp(`###\\s*${formatId}\\s*\\n([\\s\\S]*?)(?=###|$)`, "i");
      const match = fullResponse.match(regex);
      results[formatId] = match ? match[1].trim() : "Content could not be generated for this format.";
    }

    // Save generation record if user is authenticated
    try {
      const authHeader = req.headers.get("authorization");
      if (authHeader) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
        const sb = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: authHeader } },
        });
        await sb.from("generations").insert({
          user_id: (await sb.auth.getUser()).data.user?.id,
          tool: "repurpose",
          input_preview: content.substring(0, 200),
          output_preview: Object.values(results).join(" ").substring(0, 300),
        });
      }
    } catch (saveErr) {
      console.error("Failed to save generation record:", saveErr);
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("repurpose-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
