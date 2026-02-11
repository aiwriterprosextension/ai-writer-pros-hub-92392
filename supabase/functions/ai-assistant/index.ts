import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const toolContextMap: Record<string, string> = {
  "ai-humanizer": "AI Humanizer tool that rewrites AI-generated text to sound human and bypass AI detectors. Users can set intensity (light/medium/heavy).",
  "email-generator": "Email Generator tool that creates email campaigns, sequences, and newsletters. Users set topic, type, tone, audience, and sequence length.",
  "social-media": "Social Media Suite that generates platform-optimized posts for Twitter, LinkedIn, Instagram, and Facebook. Users pick platforms and tone.",
  "blog-creator": "Blog Content Creator that generates SEO-optimized blog posts with readability scoring. Users set topic, keywords, word count, and tone.",
  "amazon-reviews": "Amazon Affiliate Review Generator that creates product reviews and comparison tables. Users can do single reviews or multi-product comparisons.",
  "content-repurposing": "Content Repurposing tool that transforms content into multiple platform formats (Twitter threads, LinkedIn posts, email newsletters, etc.).",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action } = body;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "chat": {
        const { messages, currentTool } = body;
        const toolContext = toolContextMap[currentTool] || "a content creation tool";
        systemPrompt = `You are a helpful AI assistant for Writer Pros, a SaaS content creation platform. The user is currently using: ${toolContext}

You help users get the most out of the tool by:
- Answering questions about best practices (tone, word count, keywords, platform strategies)
- Providing tips for better results
- Explaining features and how to use them
- Suggesting optimal settings

Keep responses concise (2-4 sentences max unless asked for detail). Be friendly and actionable.`;
        
        const chatMessages = [
          { role: "system", content: systemPrompt },
          ...(messages || []).slice(-10),
        ];

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: chatMessages,
          }),
        });

        if (!response.ok) {
          if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          throw new Error("AI gateway error");
        }

        const data = await response.json();
        return new Response(JSON.stringify({ result: data.choices?.[0]?.message?.content || "" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "improve-input": {
        const { fieldType, userInput, toolName } = body;
        systemPrompt = `You are an expert content optimization assistant. Improve the user's input for the "${fieldType}" field of a ${toolName || "content creation"} tool. Make it more specific, compelling, and likely to produce better AI-generated results. Return ONLY the improved text, no explanations.`;
        userPrompt = `Refine and optimize this ${fieldType} for better results: "${userInput}"`;
        break;
      }

      case "quality-score": {
        const { toolName, formData } = body;
        systemPrompt = `You are a content quality analyst. Analyze the given settings and predict quality scores. You MUST respond with ONLY valid JSON, no markdown, no explanation.

Return exactly this JSON structure:
{
  "seo": { "score": <1-100>, "explanation": "<brief reason>" },
  "engagement": { "score": <1-100>, "explanation": "<brief reason>" },
  "readability": { "grade": "<e.g. Grade 8>", "score": <1-100>, "explanation": "<brief reason>" },
  "suitability": { "score": <1-100>, "explanation": "<brief reason>" },
  "suggestions": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}`;
        userPrompt = `Analyze these ${toolName} settings and predict quality scores:\n${JSON.stringify(formData, null, 2)}`;
        break;
      }

      case "workflow-suggestion": {
        const { contentType, summary, currentTool: tool } = body;
        systemPrompt = `You are a content workflow advisor. Suggest 2-3 logical next steps using our available tools: Blog Content Creator, AI Humanizer, Social Media Suite, Email Campaign Generator, Content Repurposing, Amazon Affiliate Reviews.

Respond with ONLY valid JSON array, no markdown:
[
  {
    "title": "<action title>",
    "description": "<why this helps, 1 sentence>",
    "toolPath": "<one of: /dashboard/ai-humanizer, /dashboard/email-generator, /dashboard/social-media, /dashboard/blog-creator, /dashboard/amazon-reviews, /dashboard/content-repurposing>",
    "toolName": "<tool display name>",
    "prefillData": {}
  }
]`;
        userPrompt = `User just generated ${contentType} using ${tool}. Summary: ${summary}. Suggest next logical workflow steps.`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    // For non-chat actions
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
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
