import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_CONTENT_LENGTH = 50000;
const MAX_SHORT_FIELD = 500;
const VALID_TOOLS = new Set(["humanize", "email", "social", "blog", "amazon"]);

function truncate(str: string | undefined | null, max: number): string {
  if (!str) return "";
  return str.length > max ? str.substring(0, max) : str;
}

async function authenticateRequest(req: Request): Promise<{ userId: string; authHeader: string } | Response> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const sb = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await sb.auth.getClaims(token);
  if (error || !data?.claims) {
    return new Response(JSON.stringify({ error: "Invalid authentication" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return { userId: data.claims.sub as string, authHeader };
}

const intensityInstructions: Record<string, string> = {
  light: `Make minimal changes. Only adjust the most obviously AI-sounding phrases. Keep 90% of the original structure and vocabulary. Subtle rewording only.`,
  medium: `Make moderate changes. Restructure sentences, vary vocabulary, add natural transitions. Keep the core message but make it sound naturally written. Aim for 60-70% rewritten.`,
  heavy: `Completely rewrite the content from scratch while preserving the key information and message. Use entirely different sentence structures, vocabulary, and flow. The output should be completely unrecognizable from the input while conveying the same information.`,
};

const toolPrompts: Record<string, { system: string; buildUserPrompt: (body: any) => string; getInputPreview: (body: any) => string }> = {
  humanize: {
    system: `You are an expert content rewriter specializing in making AI-generated text sound naturally human. Your goal is to:
- Rewrite the text to bypass AI detection tools (GPTZero, Turnitin, Originality.ai)
- Preserve the original meaning and key information
- Use varied sentence structures, natural transitions, and conversational elements
- Add subtle imperfections that human writers typically have
- Maintain the original tone and quality
- Do NOT add any commentary, just output the rewritten text directly.`,
    buildUserPrompt: (body: any) => {
      const intensity = ["light", "medium", "heavy"].includes(body.intensity) ? body.intensity : "medium";
      const extra = body.extraInstructions ? `\nAdditional instructions: ${truncate(body.extraInstructions, MAX_SHORT_FIELD)}` : '';
      return `Humanization intensity: ${intensity.toUpperCase()}
${intensityInstructions[intensity]}${extra}

Rewrite the following AI-generated content:\n\n${truncate(body.content, MAX_CONTENT_LENGTH)}`;
    },
    getInputPreview: (body: any) => `[${body.intensity || 'medium'}] ${truncate(body.content, 120)}`,
  },
  email: {
    system: `You are an expert email marketing copywriter. Generate professional, high-converting email content. Format your output clearly with labeled sections.`,
    buildUserPrompt: (body: any) => {
      const { emailType, topic, tone, audience, sequenceLength } = body;
      const numEmails = Math.min(sequenceLength || 1, 10);
      
      if (numEmails > 1) {
        return `Create a ${numEmails}-email ${truncate(emailType, MAX_SHORT_FIELD) || 'promotional'} sequence about "${truncate(topic, MAX_SHORT_FIELD)}".
Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'professional'}
Target audience: ${truncate(audience, MAX_SHORT_FIELD) || 'general'}

For each email in the sequence, generate under a ### EMAIL_1, ### EMAIL_2, etc. header:

Each email should contain:
- SUBJECT: A compelling subject line
- PREVIEW: Preview text (under 90 chars)
- BODY: The full email body with greeting, content, and CTA
- TIMING: Suggested send timing relative to the previous email

Make each email in the sequence build on the previous one with a clear progression.`;
      }
      
      return `Create a ${truncate(emailType, MAX_SHORT_FIELD) || 'promotional'} email about "${truncate(topic, MAX_SHORT_FIELD)}".
Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'professional'}
Target audience: ${truncate(audience, MAX_SHORT_FIELD) || 'general'}

Generate:
### SUBJECT_LINES
3 compelling subject line options (one per line)

### PREVIEW_TEXT
A short preview/preheader text (under 90 chars)

### EMAIL_BODY
The full email body with greeting, content, and CTA.

### AB_VARIANT
An alternative version of the email body with a different approach/angle.`;
    },
    getInputPreview: (body: any) => `${truncate(body.emailType, 50) || 'promotional'}: ${truncate(body.topic, 100) || ''} (${Math.min(body.sequenceLength || 1, 10)} email${(body.sequenceLength || 1) > 1 ? 's' : ''})`,
  },
  social: {
    system: `You are a social media content strategist who creates platform-optimized posts. Each post should be engaging, use appropriate formatting for the platform, and include relevant hashtags where appropriate.

IMPORTANT: For each platform, after the content, add a line "CHARACTER_COUNT: X" where X is the approximate character count of the main post text (excluding hashtags).`,
    buildUserPrompt: (body: any) => {
      const { topic, platforms, tone } = body;
      const validPlatforms = ['twitter', 'linkedin', 'instagram', 'facebook'];
      const platformList = (platforms || ['twitter', 'linkedin', 'instagram', 'facebook'])
        .filter((p: string) => validPlatforms.includes(p))
        .join(', ');
      return `Create social media posts about "${truncate(topic, MAX_SHORT_FIELD)}" for these platforms: ${platformList}.
Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'engaging and professional'}

For each platform, output under a ### PLATFORM_ID header:

### TWITTER
A tweet or short thread (each tweet under 280 chars). Include hashtags.
End with: CHARACTER_COUNT: [number]

### LINKEDIN
A professional LinkedIn post with hook, body, and CTA. Use line breaks.
End with: CHARACTER_COUNT: [number]

### INSTAGRAM
An Instagram caption with emojis, hashtags, and CTA.
End with: CHARACTER_COUNT: [number]

### FACEBOOK
An engaging Facebook post with conversational tone and a question.
End with: CHARACTER_COUNT: [number]

Only include the platforms requested.`;
    },
    getInputPreview: (body: any) => `${truncate(body.topic, 100) || ''} (${(body.platforms || []).join(', ')})`,
  },
  blog: {
    system: `You are an SEO content specialist who creates comprehensive, well-structured blog articles. Include proper heading hierarchy, engaging content, and SEO best practices.`,
    buildUserPrompt: (body: any) => {
      const { topic, keywords, wordCount, tone } = body;
      return `Write a comprehensive blog post about "${truncate(topic, MAX_SHORT_FIELD)}".
Target keywords: ${truncate(keywords, MAX_SHORT_FIELD) || topic}
Approximate length: ${Math.min(wordCount || 1500, 10000)} words
Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'informative and engaging'}

Structure your output as:

### META
Title: (SEO-optimized, under 60 chars)
Meta Description: (under 160 chars)
Focus Keyword: (primary keyword)

### READABILITY
Flesch Reading Ease: (score out of 100, higher = easier)
Grade Level: (e.g., "Grade 8")
Average Sentence Length: (in words)
Keyword Density: (percentage for focus keyword)

### OUTLINE
A bullet-point outline of the article sections

### ARTICLE
The full article with proper H2/H3 headings, paragraphs, and a compelling introduction and conclusion.`;
    },
    getInputPreview: (body: any) => `${truncate(body.topic, 100) || ''} (~${Math.min(body.wordCount || 1500, 10000)} words)`,
  },
  amazon: {
    system: `You are an expert Amazon affiliate content writer. Create comprehensive, honest, and SEO-optimized product reviews that help readers make informed purchasing decisions. Include pros, cons, and a balanced assessment.`,
    buildUserPrompt: (body: any) => {
      const { productName, category, features, comparisonProducts } = body;
      
      if (comparisonProducts && comparisonProducts.length > 0) {
        const allProducts = [productName, ...comparisonProducts].filter(Boolean).slice(0, 10).map((p: string) => truncate(p, MAX_SHORT_FIELD));
        return `Create a comparison table and analysis for these ${allProducts.length} products:
${allProducts.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n')}
Category: ${truncate(category, MAX_SHORT_FIELD) || 'General'}

Structure your output as:

### META
Title: (SEO-optimized comparison title, under 60 chars)
Meta Description: (under 160 chars)

### COMPARISON_TABLE
Create a markdown table comparing all products.

### INDIVIDUAL_REVIEWS
For each product, write a brief 2-3 paragraph review with verdict.

### WINNER
Declare an overall winner with justification.

### SUMMARY
A 2-3 sentence overall summary.`;
      }
      
      return `Write a comprehensive Amazon affiliate product review for: "${truncate(productName, MAX_SHORT_FIELD)}"
Category: ${truncate(category, MAX_SHORT_FIELD) || 'General'}
Key features to highlight: ${truncate(features, MAX_SHORT_FIELD) || 'Not specified'}

Structure your output as:

### META
Title: (SEO-optimized review title, under 60 chars)
Meta Description: (under 160 chars)

### REVIEW
A complete product review with pros, cons, and final verdict.

### SUMMARY
A 2-3 sentence summary suitable for comparison tables.`;
    },
    getInputPreview: (body: any) => {
      const products = body.comparisonProducts?.length
        ? `${truncate(body.productName, 100)} vs ${body.comparisonProducts.slice(0, 5).map((p: string) => truncate(p, 100)).join(', ')}`
        : truncate(body.productName, 200) || '';
      return `${products} (${truncate(body.category, 50) || 'General'})`;
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate
    const authResult = await authenticateRequest(req);
    if (authResult instanceof Response) return authResult;
    const { authHeader } = authResult;

    const body = await req.json();
    const { tool } = body;

    // Validate tool parameter
    if (!tool || typeof tool !== "string" || !VALID_TOOLS.has(tool)) {
      return new Response(JSON.stringify({ error: `Unknown or missing tool: ${tool}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate content length
    for (const key of Object.keys(body)) {
      if (typeof body[key] === "string" && body[key].length > MAX_CONTENT_LENGTH) {
        return new Response(JSON.stringify({ error: `Field '${key}' exceeds maximum length` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const toolConfig = toolPrompts[tool];

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

    // Save generation record
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const sb = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: authHeader } },
      });
      await sb.from("generations").insert({
        user_id: (await sb.auth.getUser()).data.user?.id,
        tool,
        input_preview: toolConfig.getInputPreview(body).substring(0, 200),
        output_preview: fullResponse.substring(0, 300),
      });
    } catch (saveErr) {
      console.error("Failed to save generation record:", saveErr);
    }

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
