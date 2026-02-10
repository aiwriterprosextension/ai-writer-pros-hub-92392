import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const toolPrompts: Record<string, { system: string; buildUserPrompt: (body: any) => string }> = {
  humanize: {
    system: `You are an expert content rewriter specializing in making AI-generated text sound naturally human. Your goal is to:
- Rewrite the text to bypass AI detection tools (GPTZero, Turnitin, Originality.ai)
- Preserve the original meaning and key information
- Use varied sentence structures, natural transitions, and conversational elements
- Add subtle imperfections that human writers typically have (occasional informal phrasing, varied paragraph lengths)
- Maintain the original tone and quality
- Do NOT add any commentary, just output the rewritten text directly.`,
    buildUserPrompt: (body: any) => `Rewrite the following AI-generated content to sound completely human-written:\n\n${body.content}`,
  },
  email: {
    system: `You are an expert email marketing copywriter. Generate professional, high-converting email content. Format your output clearly with labeled sections.`,
    buildUserPrompt: (body: any) => {
      const { emailType, topic, tone, audience } = body;
      return `Create a ${emailType || 'promotional'} email about "${topic}".
Tone: ${tone || 'professional'}
Target audience: ${audience || 'general'}

Generate:
### SUBJECT_LINES
3 compelling subject line options (one per line)

### PREVIEW_TEXT
A short preview/preheader text (under 90 chars)

### EMAIL_BODY
The full email body with greeting, content, and CTA. Use line breaks for readability.

### AB_VARIANT
An alternative version of the email body with a different approach/angle.`;
    },
  },
  social: {
    system: `You are a social media content strategist who creates platform-optimized posts. Each post should be engaging, use appropriate formatting for the platform, and include relevant hashtags where appropriate.`,
    buildUserPrompt: (body: any) => {
      const { topic, platforms, tone } = body;
      const platformList = (platforms || ['twitter', 'linkedin', 'instagram', 'facebook']).join(', ');
      return `Create social media posts about "${topic}" for these platforms: ${platformList}.
Tone: ${tone || 'engaging and professional'}

For each platform, output under a ### PLATFORM_ID header:

### TWITTER
A tweet or short thread (each tweet under 280 chars). Include hashtags.

### LINKEDIN
A professional LinkedIn post with hook, body, and CTA. Use line breaks.

### INSTAGRAM
An Instagram caption with emojis, hashtags, and CTA.

### FACEBOOK
An engaging Facebook post with conversational tone and a question.

Only include the platforms requested.`;
    },
  },
  blog: {
    system: `You are an SEO content specialist who creates comprehensive, well-structured blog articles. Include proper heading hierarchy, engaging content, and SEO best practices.`,
    buildUserPrompt: (body: any) => {
      const { topic, keywords, wordCount, tone } = body;
      return `Write a comprehensive blog post about "${topic}".
Target keywords: ${keywords || topic}
Approximate length: ${wordCount || 1500} words
Tone: ${tone || 'informative and engaging'}

Structure your output as:

### META
Title: (SEO-optimized, under 60 chars)
Meta Description: (under 160 chars)
Focus Keyword: (primary keyword)

### OUTLINE
A bullet-point outline of the article sections

### ARTICLE
The full article with proper H2/H3 headings (use ## and ###), paragraphs, and a compelling introduction and conclusion. Include internal linking suggestions in [brackets].`;
    },
  },
  amazon: {
    system: `You are an expert Amazon affiliate content writer. Create comprehensive, honest, and SEO-optimized product reviews that help readers make informed purchasing decisions. Include pros, cons, and a balanced assessment.`,
    buildUserPrompt: (body: any) => {
      const { productName, category, features } = body;
      return `Write a comprehensive Amazon affiliate product review for: "${productName}"
Category: ${category || 'General'}
Key features to highlight: ${features || 'Not specified'}

Structure your output as:

### META
Title: (SEO-optimized review title, under 60 chars)
Meta Description: (under 160 chars)

### REVIEW
A complete product review with:
- Engaging introduction
- Key features and benefits (use bullet points)
- Pros and Cons section
- Who is this product for?
- Value for money assessment
- Final verdict with rating out of 5

### SUMMARY
A 2-3 sentence summary suitable for comparison tables.`;
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { tool } = body;

    const toolConfig = toolPrompts[tool];
    if (!toolConfig) {
      return new Response(JSON.stringify({ error: `Unknown tool: ${tool}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: toolConfig.system },
          { role: "user", content: toolConfig.buildUserPrompt(body) },
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

    return new Response(JSON.stringify({ result: fullResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-tools error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
