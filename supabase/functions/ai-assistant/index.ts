import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_CONTENT_LENGTH = 50000;
const MAX_SHORT_FIELD = 500;

const VALID_ACTIONS = new Set([
  "chat", "improve-input", "quality-score", "workflow-suggestion",
  "generate-topics", "keyword-research", "generate-persona", "generate-audience-persona",
  "generate-outline", "generate-section", "seo-analysis", "visual-suggestions",
  "fact-check", "rewrite-section", "adjust-readability",
  "email-topic-ideas", "email-audience-profile", "email-type-suggestion",
  "email-subject-lines", "email-sequence-strategy", "email-preview-score",
  "email-ab-variations",
  "extract-product", "detect-features", "suggest-alternatives", "generate-faq",
  "generate-disclosure", "enhance-authenticity", "review-score", "regenerate-section",
  "social-content-ideas", "social-hashtag-research", "social-platform-tips",
  "social-calendar", "social-thread-creator", "social-engagement-hooks",
  "social-optimize-formatting", "social-visual-suggestions",
  "repurpose-analyze", "repurpose-preview", "repurpose-visual-suggestions",
  "repurpose-hashtags", "repurpose-schedule", "repurpose-series",
  "repurpose-seo", "repurpose-cta",
  "humanizer-analyze", "humanizer-generate-content", "humanizer-score-after",
  "humanizer-versions", "humanizer-originality", "humanizer-bulk",
]);

function truncate(str: string | undefined | null, max: number): string {
  if (!str) return "";
  return str.length > max ? str.substring(0, max) : str;
}

function validateBody(body: any): string | null {
  if (!body || typeof body !== "object") return "Invalid request body";
  const { action } = body;
  if (!action || typeof action !== "string") return "Missing action parameter";
  if (!VALID_ACTIONS.has(action)) return `Unknown action: ${action}`;
  
  // Check string fields for length
  for (const key of Object.keys(body)) {
    const val = body[key];
    if (typeof val === "string" && val.length > MAX_CONTENT_LENGTH) {
      return `Field '${key}' exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`;
    }
  }
  return null;
}

async function authenticateRequest(req: Request): Promise<{ userId: string } | Response> {
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
  return { userId: data.claims.sub as string };
}

const toolContextMap: Record<string, string> = {
  "ai-humanizer": "AI Humanizer tool that rewrites AI-generated text to sound human and bypass AI detectors.",
  "email-generator": "Email Generator tool that creates email campaigns, sequences, and newsletters.",
  "social-media": "Social Media Suite that generates platform-optimized posts for Twitter, LinkedIn, Instagram, and Facebook.",
  "blog-creator": "Blog Content Creator that generates SEO-optimized blog posts with readability scoring.",
  "amazon-reviews": "Amazon Affiliate Review Generator that creates product reviews and comparison tables.",
  "content-repurposing": "Content Repurposing tool that transforms content into multiple platform formats.",
  "dashboard": "The main dashboard overview showing usage stats, favorites, and workflow suggestions.",
};

async function callAI(apiKey: string, systemPrompt: string, userPrompt: string) {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
    if (response.status === 429) throw { status: 429, message: "Rate limit exceeded. Please try again in a moment." };
    if (response.status === 402) throw { status: 402, message: "AI credits depleted. Please add credits." };
    const t = await response.text();
    console.error("AI gateway error:", response.status, t);
    throw { status: 500, message: "AI gateway error" };
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Authenticate
    const authResult = await authenticateRequest(req);
    if (authResult instanceof Response) return authResult;

    const body = await req.json();

    // Validate input
    const validationError = validateBody(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action } = body;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "chat": {
        const { messages, currentTool } = body;
        const toolContext = toolContextMap[truncate(currentTool, MAX_SHORT_FIELD)] || "a content creation tool";
        const chatSystemPrompt = `You are a helpful AI assistant for Writer Pros, a SaaS content creation platform. The user is currently using: ${toolContext}

You help users get the most out of the tool by:
- Answering questions about best practices
- Providing tips for better results
- Explaining features and how to use them
- Suggesting optimal settings

Keep responses concise (2-4 sentences max unless asked for detail). Be friendly and actionable.`;
        
        const validatedMessages = (messages || []).slice(-10).map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: truncate(m.content, 5000),
        }));

        const chatMessages = [
          { role: "system", content: chatSystemPrompt },
          ...validatedMessages,
        ];

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages: chatMessages }),
        });

        if (!response.ok) {
          if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          if (response.status === 402) return new Response(JSON.stringify({ error: "AI credits depleted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
          throw new Error("AI gateway error");
        }

        const data = await response.json();
        return new Response(JSON.stringify({ result: data.choices?.[0]?.message?.content || "" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "improve-input": {
        const { fieldType, userInput, toolName } = body;
        systemPrompt = `You are an expert content optimization assistant. Improve the user's input for the "${truncate(fieldType, MAX_SHORT_FIELD)}" field of a ${truncate(toolName, MAX_SHORT_FIELD) || "content creation"} tool. Make it more specific, compelling, and likely to produce better AI-generated results. Return ONLY the improved text, no explanations.`;
        userPrompt = `Refine and optimize this ${truncate(fieldType, MAX_SHORT_FIELD)} for better results: "${truncate(userInput, MAX_CONTENT_LENGTH)}"`;
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
        userPrompt = `Analyze these ${truncate(toolName, MAX_SHORT_FIELD)} settings and predict quality scores:\n${JSON.stringify(formData, null, 2).substring(0, 5000)}`;
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
        userPrompt = `User just generated ${truncate(contentType, MAX_SHORT_FIELD)} using ${truncate(tool, MAX_SHORT_FIELD)}. Summary: ${truncate(summary, 300)}. Suggest next logical workflow steps.`;
        break;
      }

      // === BLOG CREATOR SPECIFIC ACTIONS ===

      case "generate-topics": {
        const { niche, audience, goal } = body;
        systemPrompt = `You are an SEO content strategist. Generate trending blog topic ideas. Respond with ONLY valid JSON, no markdown:
[
  {
    "title": "<topic title>",
    "angle": "<brief angle description, max 30 words>",
    "seoPotential": "<High|Medium|Low>"
  }
]
Provide exactly 10 topics.`;
        userPrompt = `Generate 10 trending, SEO-friendly blog topics for the ${truncate(niche, MAX_SHORT_FIELD)} niche targeting ${truncate(audience, MAX_SHORT_FIELD) || 'general audience'} with the goal of ${truncate(goal, MAX_SHORT_FIELD) || 'educating readers'}. For each topic, include: topic title, brief angle description (30 words), and estimated SEO potential (High/Medium/Low).`;
        break;
      }

      case "keyword-research": {
        const { topic } = body;
        systemPrompt = `You are an SEO keyword research expert. Analyze the topic and provide keyword data. Respond with ONLY valid JSON, no markdown:
{
  "primary": [
    { "keyword": "<keyword>", "volume": "<e.g. 5.2K>", "difficulty": <1-100> }
  ],
  "lsi": [
    { "keyword": "<keyword>", "explanation": "<brief explanation>" }
  ],
  "longTail": [
    { "keyword": "<long-tail keyword>" }
  ]
}
Provide 3 primary, 5 LSI, and 5 long-tail keywords.`;
        userPrompt = `Analyze this blog topic: "${truncate(topic, MAX_SHORT_FIELD)}" and research keywords. Provide: 3 primary keywords (high search volume 1K-10K, medium competition), 5 LSI (latent semantic indexing) keywords with explanations, and 5 long-tail keyword variations. Include estimated monthly search volume and difficulty score (1-100) for primary keywords.`;
        break;
      }

      case "generate-persona": {
        const { productName, problem, priceSensitivity, experienceLevel } = body;
        systemPrompt = `You are a marketing expert specializing in buyer personas. Create a concise target buyer persona. Respond with ONLY the persona description (2-3 sentences), no JSON, no markdown headers.`;
        userPrompt = `Create target buyer persona for "${truncate(productName, MAX_SHORT_FIELD)}" that solves "${truncate(problem, MAX_SHORT_FIELD) || 'general needs'}" for ${truncate(experienceLevel, MAX_SHORT_FIELD) || 'intermediate'} users at ${truncate(priceSensitivity, MAX_SHORT_FIELD) || 'mid-range'} price point. Write 2-3 sentences describing the ideal buyer, their motivations, and what they value most.`;
        break;
      }

      case "generate-audience-persona": {
        const { targetLevel, painPoint, desiredAction, demographics } = body;
        systemPrompt = `You are a content marketing expert. Create a detailed reader persona based on the provided information. Respond with a 3-4 sentence persona description that captures who this reader is, what they need, and how content should speak to them. No JSON, no markdown headers, just the persona text.`;
        userPrompt = `Create detailed reader persona: expertise level: ${truncate(targetLevel, MAX_SHORT_FIELD) || 'general'}, pain point: "${truncate(painPoint, MAX_SHORT_FIELD) || 'not specified'}", desired action after reading: "${truncate(desiredAction, MAX_SHORT_FIELD) || 'learn something new'}", demographics: ${truncate(demographics, MAX_SHORT_FIELD) || 'not specified'}. Write 3-4 sentences describing this reader persona.`;
        break;
      }

      case "generate-outline": {
        const { topic, keywords, audience, wordCount } = body;
        systemPrompt = `You are an expert blog content architect. Create a detailed blog post outline. Respond with ONLY valid JSON, no markdown:
{
  "title": "<SEO-optimized title>",
  "sections": [
    {
      "id": "<unique-id>",
      "type": "h2",
      "title": "<section title>",
      "suggestedWords": <number>,
      "keyPoints": ["<point 1>", "<point 2>"],
      "subsections": [
        {
          "id": "<unique-id>",
          "type": "h3",
          "title": "<subsection title>",
          "suggestedWords": <number>,
          "keyPoints": ["<point 1>"]
        }
      ]
    }
  ],
  "totalWords": <total word count target>
}
Include 5-8 H2 sections with 2-3 H3 subsections each.`;
        userPrompt = `Create detailed blog outline for: "${truncate(topic, MAX_SHORT_FIELD)}". Keywords: ${truncate(keywords, MAX_SHORT_FIELD) || topic}, Audience: ${truncate(audience, MAX_SHORT_FIELD) || 'general'}, Target length: ${wordCount || 1500} words. Include: 5-8 H2 sections, 2-3 H3 subsections per H2, key points per section, and suggested word count per section.`;
        break;
      }

      case "generate-section": {
        const { sectionTitle, keyPoints, suggestedWords, topic, keywords, tone, previousContent } = body;
        systemPrompt = `You are an expert blog writer. Write ONLY the requested section of a blog post. Output the section content directly with proper formatting (use ## for H2, ### for H3). No meta-commentary, no headers like "Here is the section".`;
        userPrompt = `Write the "${truncate(sectionTitle, MAX_SHORT_FIELD)}" section of a blog post about "${truncate(topic, MAX_SHORT_FIELD)}".
Keywords to naturally include: ${truncate(keywords, MAX_SHORT_FIELD) || 'none'}
Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'informative'}
Target length: ~${suggestedWords || 300} words
Key points to cover: ${(keyPoints || []).map((p: string) => truncate(p, MAX_SHORT_FIELD)).join(', ')}
${previousContent ? `Previous content context (for continuity): ${truncate(previousContent, 500)}` : ''}
Write this section now.`;
        break;
      }

      case "seo-analysis": {
        const { topic, keywords, wordCount, content, outlineSummary } = body;
        const isPreGeneration = !content;
        systemPrompt = `You are an SEO analyst. ${isPreGeneration ? 'Predict SEO performance based on settings.' : 'Analyze the generated content for SEO.'} Respond with ONLY valid JSON, no markdown:
{
  "seoScore": <1-100>,
  "keywordStrategy": "<Good|Needs Work|Excellent>",
  "contentLength": "<Optimal|Too Short|Too Long>",
  "keywordDensity": ${isPreGeneration ? '"<predicted percentage>"' : '<actual percentage as number>'},
  "readabilityScore": <1-100>,
  "readabilityGrade": "<e.g. Grade 8>",
  "suggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  ${!isPreGeneration ? `"metaDescriptions": ["<option 1>", "<option 2>", "<option 3>"],
  "titleVariations": ["<title 1>", "<title 2>", "<title 3>", "<title 4>", "<title 5>"],
  "snippetOptimization": "<assessment>",` : ''}
  "overallAssessment": "<brief overall assessment>"
}`;
        userPrompt = isPreGeneration
          ? `Predict SEO performance for: Topic: "${truncate(topic, MAX_SHORT_FIELD)}", Keywords: "${truncate(keywords, MAX_SHORT_FIELD)}", Word Count: ${wordCount}, Structure: ${truncate(outlineSummary, 1000) || 'standard blog format'}.`
          : `Analyze this blog content for SEO: Topic: "${truncate(topic, MAX_SHORT_FIELD)}", Keywords: "${truncate(keywords, MAX_SHORT_FIELD)}", Target Word Count: ${wordCount}.\n\nContent:\n${truncate(content, 4000)}`;
        break;
      }

      case "visual-suggestions": {
        const { content } = body;
        systemPrompt = `You are a visual content strategist. Analyze the blog post and suggest visual content. Respond with ONLY valid JSON, no markdown:
[
  {
    "imageNumber": <number>,
    "type": "<photo|infographic|chart|diagram|screenshot>",
    "placement": "<e.g. After Introduction>",
    "prompt": "<detailed image generation prompt>",
    "altText": "<SEO-optimized alt text>"
  }
]
Suggest 3-5 visuals.`;
        userPrompt = `Analyze this blog post and suggest visual content:\n${truncate(content, 3000)}\n\nProvide: total number of visuals needed, visual type for each, optimal placement, detailed image generation prompt, and SEO alt text.`;
        break;
      }

      case "fact-check": {
        const { content } = body;
        systemPrompt = `You are a fact-checking expert. Identify all factual claims that should be verified. Respond with ONLY valid JSON, no markdown:
[
  {
    "claim": "<quoted claim from content>",
    "concernLevel": "<High|Medium|Low>",
    "reasoning": "<why this needs verification>",
    "suggestedSources": ["<source 1>", "<source 2>"],
    "confidence": <0-100>
  }
]
Flag 3-8 claims.`;
        userPrompt = `Identify all factual claims, statistics, and statements in this content that should be fact-checked:\n${truncate(content, 4000)}\n\nFlag each with confidence level and provide reasoning.`;
        break;
      }

      case "rewrite-section": {
        const { content, instruction } = body;
        systemPrompt = `You are an expert content editor. Apply the requested edit to the content. Return ONLY the edited content, no commentary.`;
        userPrompt = `${truncate(instruction, MAX_SHORT_FIELD)}\n\nContent:\n${truncate(content, 3000)}`;
        break;
      }

      case "adjust-readability": {
        const { content, targetGrade } = body;
        systemPrompt = `You are a readability expert. Rewrite the content to achieve the target reading level while preserving all information and meaning. Return ONLY the rewritten content.`;
        userPrompt = `Rewrite this content to achieve ${truncate(targetGrade, 50) || 'Grade 8'} reading level:\n${truncate(content, 4000)}`;
        break;
      }

      // === EMAIL GENERATOR SPECIFIC ACTIONS ===

      case "email-topic-ideas": {
        const { industry, campaignGoal, seasonEvent } = body;
        systemPrompt = `You are an email marketing strategist. Generate specific, actionable email campaign topic ideas. Respond with ONLY valid JSON, no markdown:
[
  { "title": "<topic title>", "description": "<1 sentence description>" }
]
Provide exactly 10 topics.`;
        userPrompt = `Generate 10 email campaign topic ideas for a ${truncate(industry, MAX_SHORT_FIELD)} business with goal of ${truncate(campaignGoal, MAX_SHORT_FIELD)}${seasonEvent ? ` during ${truncate(seasonEvent, MAX_SHORT_FIELD)}` : ''}. Make them specific and actionable.`;
        break;
      }

      case "email-audience-profile": {
        const { industry, problem, awarenessLevel, demographics } = body;
        systemPrompt = `You are an email marketing expert. Create a concise target audience description for email campaigns. Return ONLY the audience description text (2-3 sentences), no JSON, no headers.`;
        userPrompt = `Create a detailed target audience description for email campaign. Industry: ${truncate(industry, MAX_SHORT_FIELD)}, Problem: "${truncate(problem, MAX_SHORT_FIELD)}", Awareness: ${truncate(awarenessLevel, MAX_SHORT_FIELD)}, Demographics: ${truncate(demographics, MAX_SHORT_FIELD) || 'not specified'}. Write 2-3 sentences describing who they are, what they need, and how to speak to them.`;
        break;
      }

      case "email-type-suggestion": {
        const { topic } = body;
        systemPrompt = `You are an email marketing analyst. Analyze the topic and suggest the best email type. Respond with ONLY valid JSON, no markdown:
{
  "suggestedType": "<promotional|welcome|newsletter|product-launch|re-engagement|sales>",
  "matchPercent": <50-100>,
  "reason": "<one sentence explanation>"
}`;
        userPrompt = `Analyze this email topic: "${truncate(topic, MAX_SHORT_FIELD)}". Which email type is best: Promotional, Welcome Sequence, Newsletter, Product Launch, Re-engagement, or Sales Sequence? Provide percentage match and one-sentence reason.`;
        break;
      }

      case "email-subject-lines": {
        const { topic, audience, emailType } = body;
        systemPrompt = `You are an email subject line expert. Generate compelling subject line variations. Respond with ONLY valid JSON, no markdown:
[
  {
    "text": "<subject line>",
    "style": "<Urgency|Curiosity|Benefit|Personalization|Question>",
    "estimatedOpenRate": "<e.g. 18-24%>"
  }
]
Provide exactly 5 subject lines.`;
        userPrompt = `Generate 5 compelling email subject line variations. Topic: "${truncate(topic, MAX_SHORT_FIELD)}", Audience: "${truncate(audience, MAX_SHORT_FIELD) || 'general'}", Type: ${truncate(emailType, MAX_SHORT_FIELD) || 'promotional'}. Styles: 1) urgency-focused, 2) curiosity-driven, 3) benefit-led, 4) personalization, 5) question-based.`;
        break;
      }

      case "email-sequence-strategy": {
        const { campaignGoal, timeline, audienceTemp } = body;
        systemPrompt = `You are an email sequence strategist. Create an email sequence plan. Respond with ONLY valid JSON, no markdown:
{
  "totalEmails": <1-7>,
  "suggestedTone": "<professional|friendly|urgent|casual|formal>",
  "emails": [
    {
      "number": <1-7>,
      "purpose": "<purpose of this email>",
      "dayAfterPrevious": <days>,
      "subjectAngle": "<suggested subject angle>"
    }
  ]
}`;
        userPrompt = `Create an email sequence strategy. Goal: ${truncate(campaignGoal, MAX_SHORT_FIELD)}, Timeline: ${truncate(timeline, MAX_SHORT_FIELD)}, Audience Temperature: ${truncate(audienceTemp, MAX_SHORT_FIELD)}. Suggest: optimal number of emails (1-7), purpose of each, days between emails, and subject angle for each.`;
        break;
      }

      case "email-preview-score": {
        const { topic, audience, emailType, tone, sequenceLength, ctaGoal } = body;
        systemPrompt = `You are an email marketing analyst. Predict campaign performance. Respond with ONLY valid JSON, no markdown:
{
  "openRate": "<e.g. 20-28%>",
  "conversionPotential": "<Low|Medium|High>",
  "conversionPercent": "<e.g. 3-5%>",
  "spamRisk": <1-10>,
  "overallScore": <1-100>,
  "warnings": ["<warning 1>"],
  "suggestions": ["<suggestion 1>", "<suggestion 2>"]
}`;
        userPrompt = `Analyze this email campaign setup and predict performance. Topic: "${truncate(topic, MAX_SHORT_FIELD)}", Audience: "${truncate(audience, MAX_SHORT_FIELD)}", Type: ${truncate(emailType, MAX_SHORT_FIELD)}, Tone: ${truncate(tone, MAX_SHORT_FIELD)}, Sequence: ${sequenceLength} emails, CTA Goal: ${truncate(ctaGoal, MAX_SHORT_FIELD) || 'not set'}. Provide expected open rate, conversion potential, spam risk, and suggestions.`;
        break;
      }

      case "email-ab-variations": {
        const { content } = body;
        systemPrompt = `You are an email copywriting expert. Create 2 A/B test variations of the email. Respond with ONLY valid JSON, no markdown:
{
  "variationB": { "approach": "Story-driven", "content": "<full email variation>" },
  "variationC": { "approach": "Data-focused", "content": "<full email variation>" }
}
Keep the core message the same but change the approach.`;
        userPrompt = `Create 2 A/B test variations of this email:\n\n${truncate(content, 3000)}\n\nVariation B: story-driven approach. Variation C: data-focused approach. Keep core message same.`;
        break;
      }

      // === AMAZON AFFILIATE SPECIFIC ACTIONS ===

      case "extract-product": {
        const { input } = body;
        systemPrompt = `You are a product information expert. Extract product information from an Amazon URL or ASIN. Respond with ONLY valid JSON, no markdown:
{
  "productName": "<full product name>",
  "brand": "<brand name>",
  "category": "<category>",
  "features": ["<feature 1>", "<feature 2>"],
  "estimatedPriceRange": "<e.g. $50-$80>",
  "confidence": <0.0-1.0>
}`;
        userPrompt = `Extract product information from this identifier: ${truncate(input, MAX_SHORT_FIELD)}.`;
        break;
      }

      case "detect-features": {
        const { productName } = body;
        systemPrompt = `You are a product expert. Research and suggest key features. Respond with ONLY valid JSON, no markdown:
[{ "feature": "<feature description>", "importance": <1-5> }]
Provide up to 10 features ranked by importance.`;
        userPrompt = `Research and suggest 7-10 key features for this product: ${truncate(productName, MAX_SHORT_FIELD)}.`;
        break;
      }

      case "suggest-alternatives": {
        const { productName, category } = body;
        systemPrompt = `You are a product comparison expert. Find competing alternatives. Respond with ONLY valid JSON array, no markdown:
[{ "name": "<product name>", "differentiator": "<key differentiator>", "advantage": "<main advantage>" }]
Provide exactly 3 alternatives.`;
        userPrompt = `Find 3 alternative products that compete with "${truncate(productName, MAX_SHORT_FIELD)}" in the ${truncate(category, MAX_SHORT_FIELD) || 'general'} category.`;
        break;
      }

      case "generate-faq": {
        const { productName, category } = body;
        systemPrompt = `You are an SEO content expert. Generate FAQ questions and answers. Respond with ONLY valid JSON array, no markdown:
[{ "question": "<question>", "answer": "<answer, 2-3 sentences>" }]
Provide 6-8 Q&A pairs.`;
        userPrompt = `Generate 6-8 FAQs about "${truncate(productName, MAX_SHORT_FIELD)}" (category: ${truncate(category, MAX_SHORT_FIELD) || 'general'}).`;
        break;
      }

      case "generate-disclosure": {
        const { tone } = body;
        systemPrompt = `You are an FTC compliance expert. Generate an affiliate disclosure statement. Return ONLY the disclosure text.`;
        userPrompt = `Generate an FTC-compliant Amazon affiliate disclosure with a ${truncate(tone, MAX_SHORT_FIELD) || 'standard'} tone.`;
        break;
      }

      case "enhance-authenticity": {
        const { reviewContent, testingDuration, primaryUseCase, notableExperience } = body;
        systemPrompt = `You are an expert review writer. Enhance the review with authentic personal experience details. Return ONLY the enhanced text.`;
        userPrompt = `Enhance this review:\nTesting Duration: ${truncate(testingDuration, MAX_SHORT_FIELD) || 'not specified'}\nPrimary Use Case: ${truncate(primaryUseCase, MAX_SHORT_FIELD) || 'general use'}\nNotable Experience: ${truncate(notableExperience, MAX_SHORT_FIELD) || 'none'}\n\nOriginal:\n${truncate(reviewContent, 3000)}`;
        break;
      }

      case "review-score": {
        const { reviewContent, seoKeyword, targetWordCount } = body;
        systemPrompt = `You are a content quality analyst. Respond with ONLY valid JSON, no markdown:
{
  "seoScore": <1-100>,
  "readabilityGrade": "<e.g. Grade 8>",
  "readabilityScore": <1-100>,
  "biasDetection": "<Balanced|Positive|Negative>",
  "authenticityScore": <1-100>,
  "wordCount": <count>,
  "keywordDensity": <percentage>,
  "suggestions": ["<suggestion 1>", "<suggestion 2>"]
}`;
        userPrompt = `Analyze this review:\nSEO Keyword: ${truncate(seoKeyword, MAX_SHORT_FIELD) || 'none'}\nTarget Word Count: ${targetWordCount || 'not specified'}\n\n${truncate(reviewContent, 3000)}`;
        break;
      }

      case "regenerate-section": {
        const { reviewContent, section, productName, tone } = body;
        systemPrompt = `You are an expert product review writer. Regenerate ONLY the specified section. Return ONLY the new section text.`;
        userPrompt = `Regenerate the "${truncate(section, MAX_SHORT_FIELD)}" section of review for "${truncate(productName, MAX_SHORT_FIELD)}". Tone: ${truncate(tone, MAX_SHORT_FIELD) || 'balanced'}.\n\n${truncate(reviewContent, 3000)}`;
        break;
      }

      // === SOCIAL MEDIA SUITE SPECIFIC ACTIONS ===

      case "social-content-ideas": {
        const { businessType, industry, wins, challenges } = body;
        systemPrompt = `You are a social media content strategist. Generate specific, actionable content ideas. Respond with ONLY valid JSON, no markdown:
[
  {
    "title": "<idea title>",
    "angle": "<content angle, 50-80 words>",
    "platforms": ["<twitter|linkedin|instagram|facebook>"],
    "engagementPotential": "<High|Medium|Low>"
  }
]
Provide exactly 10 ideas.`;
        userPrompt = `Generate 10 specific social media content ideas for ${truncate(businessType, MAX_SHORT_FIELD) || 'a business'} in ${truncate(industry, MAX_SHORT_FIELD) || 'general'} industry. Context - Recent wins: ${truncate(wins, MAX_SHORT_FIELD) || 'none'}, Challenges: ${truncate(challenges, MAX_SHORT_FIELD) || 'none'}. Make each idea actionable with a specific angle.`;
        break;
      }

      case "social-hashtag-research": {
        const { topic, platform } = body;
        systemPrompt = `You are a social media hashtag expert. Research hashtags for the given topic and platform. Respond with ONLY valid JSON, no markdown:
{
  "highVolume": [{ "tag": "<#hashtag>", "estimatedReach": "<e.g. 500K+>" }],
  "niche": [{ "tag": "<#hashtag>", "estimatedReach": "<e.g. 25K>" }],
  "trending": [{ "tag": "<#hashtag>", "estimatedReach": "<e.g. 100K+>" }],
  "optimalCount": <number>
}
Provide 5 high-volume, 5 niche, and 3 trending hashtags.`;
        userPrompt = `Analyze this social media topic for ${truncate(platform, MAX_SHORT_FIELD)}: "${truncate(topic, MAX_SHORT_FIELD)}". Suggest hashtags: 5 high-volume (100K+ uses), 5 niche-specific (10K-50K uses), 3 trending. Also provide optimal hashtag count for ${truncate(platform, MAX_SHORT_FIELD)}.`;
        break;
      }

      case "social-platform-tips": {
        const { platform } = body;
        systemPrompt = `You are a social media best practices expert. Respond with ONLY valid JSON, no markdown:
{
  "charMin": <number>,
  "charMax": <number>,
  "hashtagCount": "<e.g. 3-5>",
  "bestTimes": ["<e.g. 9:00 AM EST>", "<e.g. 12:00 PM EST>"],
  "engagementTip": "<one actionable engagement tactic>"
}`;
        userPrompt = `Provide current best practices for ${truncate(platform, MAX_SHORT_FIELD)} content creation: ideal character count range, recommended hashtag count, best posting times (EST), and one engagement tactic.`;
        break;
      }

      case "social-calendar": {
        const { topic, platforms: calPlatforms } = body;
        systemPrompt = `You are a social media scheduling expert. Respond with ONLY valid JSON, no markdown:
{
  "schedule": [
    {
      "platform": "<platform>",
      "bestDay": "<e.g. Tuesday>",
      "bestTime": "<e.g. 10:00 AM EST>",
      "reasoning": "<one sentence>"
    }
  ],
  "contentMixStrategy": "<2-3 sentence strategy>"
}`;
        userPrompt = `Suggest posting schedule for content about "${truncate(topic, MAX_SHORT_FIELD)}" across these platforms: ${(calPlatforms || []).map((p: string) => truncate(p, MAX_SHORT_FIELD)).join(', ')}. Provide best day and time for each platform (EST timezone), with reasoning. Also suggest content mix strategy.`;
        break;
      }

      case "social-thread-creator": {
        const { content, platform } = body;
        if (platform === 'twitter') {
          systemPrompt = `You are a Twitter thread expert. Convert content into an engaging thread. Respond with ONLY valid JSON, no markdown:
{ "tweets": [{ "number": <1-10>, "text": "<tweet text under 280 chars>", "charCount": <number> }] }
Create 5-10 tweets. Start with a hook, number tweets, use emojis strategically.`;
          userPrompt = `Convert this content into an engaging Twitter thread with 5-10 tweets:\n${truncate(content, 3000)}`;
        } else {
          systemPrompt = `You are a LinkedIn carousel expert. Structure content into carousel slides. Respond with ONLY valid JSON, no markdown:
{ "slides": [{ "number": <1-8>, "title": "<catchy slide title>", "content": "<slide content, 2-3 sentences>" }] }
Create 6-8 slides with catchy titles per slide.`;
          userPrompt = `Structure this content into 6-8 LinkedIn carousel slides with catchy titles per slide:\n${truncate(content, 3000)}`;
        }
        break;
      }

      case "social-engagement-hooks": {
        const { content, options, platforms: engPlatforms } = body;
        systemPrompt = `You are a social media engagement expert. Generate engagement hooks. Respond with ONLY valid JSON, no markdown:
{
  "question": "<engagement question to boost comments>",
  "pollIdea": "<poll suggestion with 2-4 options>",
  "callToAction": "<compelling CTA>"
}
Only include the requested types.`;
        userPrompt = `Based on this content "${truncate(content, 1000)}", generate: ${(options || []).map((o: string) => truncate(o, 100)).join(', ')}. Make them natural and platform-appropriate for ${(engPlatforms || []).map((p: string) => truncate(p, 50)).join(', ')}.`;
        break;
      }

      case "social-optimize-formatting": {
        const { content, platform } = body;
        systemPrompt = `You are a social media formatting expert. Optimize the post with strategic emojis, line breaks, and formatting. Return ONLY the optimized post text, no JSON, no commentary.`;
        userPrompt = `Optimize this social post for ${truncate(platform, MAX_SHORT_FIELD)} by adding strategic emojis, line breaks, and formatting for maximum engagement:\n\n${truncate(content, 3000)}`;
        break;
      }

      case "social-visual-suggestions": {
        const { content } = body;
        systemPrompt = `You are a visual content strategist for social media. Respond with ONLY valid JSON, no markdown:
{
  "visualType": "<infographic|photo|quote-card|video|carousel>",
  "colorPalette": ["<#hex1>", "<#hex2>", "<#hex3>", "<#hex4>", "<#hex5>"],
  "imagePrompt": "<detailed image generation prompt for AI>",
  "thumbnailPlacement": "<suggestion for thumbnail placement>"
}`;
        userPrompt = `Suggest visual content for this social post:\n${truncate(content, 2000)}\n\nProvide: recommended visual type, color palette (5 hex colors), detailed image generation prompt, and thumbnail placement suggestion.`;
        break;
      }

      // === CONTENT REPURPOSING SPECIFIC ACTIONS ===

      case "repurpose-analyze": {
        const { content } = body;
        systemPrompt = `You are a content analysis expert. Analyze the given content thoroughly. Respond with ONLY valid JSON, no markdown:
{
  "contentType": "<blog post|article|video script|social post|press release|whitepaper|other>",
  "confidence": <50-99>,
  "themes": ["<theme 1>", "<theme 2>", "<theme 3>"],
  "takeaways": ["<takeaway 1>", "<takeaway 2>", "<takeaway 3>"],
  "readingLevel": "<e.g. Grade 8>",
  "tone": "<professional|casual|technical|conversational|academic>",
  "formatRecommendations": [
    { "format": "<twitter|linkedin|instagram|facebook|email|blog|video-script|podcast-script|pinterest|tiktok>", "matchScore": <30-99>, "reason": "<brief reason>" }
  ],
  "warnings": ["<any concern about repurposing this content>"]
}
Rank all 10 formats by match score. Include warnings if content is too short, too niche, or has issues.`;
        userPrompt = `Analyze this content for repurposing:\n\n${truncate(content, 4000)}`;
        break;
      }

      case "repurpose-preview": {
        const { content, formats } = body;
        systemPrompt = `You are a content repurposing expert. Create short previews for each format. Respond with ONLY valid JSON, no markdown:
[
  { "format": "<format id>", "preview": "<100 char preview text>", "status": "<good|warning>", "statusReason": "<brief reason>" }
]`;
        userPrompt = `Create 100-character preview for content in each format: ${(formats || []).map((f: string) => truncate(f, 100)).join(', ')}. Source content: ${truncate(content, 2000)}`;
        break;
      }

      case "repurpose-visual-suggestions": {
        const { formats, contentSummary } = body;
        systemPrompt = `You are a visual content strategist. Suggest visual content for repurposed formats. Respond with ONLY valid JSON, no markdown:
[
  {
    "format": "<format id>",
    "visualType": "<quote graphic|infographic|photo|video thumbnail|carousel>",
    "quote": "<extracted quote if applicable, or null>",
    "colorPalette": ["<#hex1>", "<#hex2>", "<#hex3>", "<#hex4>", "<#hex5>"],
    "imagePrompt": "<detailed image generation prompt>"
  }
]`;
        userPrompt = `Suggest visual content for these repurposed formats: ${(formats || []).map((f: string) => truncate(f, 100)).join(', ')}. Source content summary: ${truncate(contentSummary, 2000)}`;
        break;
      }

      case "repurpose-hashtags": {
        const { platform, contentSummary } = body;
        systemPrompt = `You are a social media hashtag expert. Respond with ONLY valid JSON, no markdown:
{
  "hashtags": [{ "tag": "<#hashtag>", "category": "<Trending|Niche|Branded>" }],
  "mentions": [{ "handle": "<@handle>", "reason": "<why mention>" }]
}
Provide 15-25 hashtags and 3-5 mentions.`;
        userPrompt = `Generate relevant hashtags and accounts to mention for this content on ${truncate(platform, MAX_SHORT_FIELD)}: ${truncate(contentSummary, 1500)}`;
        break;
      }

      case "repurpose-schedule": {
        const { formats } = body;
        systemPrompt = `You are a content scheduling expert. Respond with ONLY valid JSON, no markdown:
[
  { "format": "<format id>", "bestDay": "<e.g. Tuesday>", "bestTime": "<e.g. 10:00 AM EST>", "reasoning": "<one sentence>" }
]`;
        userPrompt = `Recommend optimal posting times for these content formats: ${(formats || []).map((f: string) => truncate(f, 100)).join(', ')}. Consider platform best practices and content strategy. Provide day of week and time (EST) for each.`;
        break;
      }

      case "repurpose-series": {
        const { content } = body;
        systemPrompt = `You are a content strategist. Break long-form content into a series. Respond with ONLY valid JSON, no markdown:
{
  "seriesName": "<series title>",
  "parts": [
    { "partNumber": <1-5>, "title": "<part title>", "summary": "<2-3 sentence summary>", "wordCount": <300-500> }
  ]
}
Create 3-5 parts.`;
        userPrompt = `Break this long-form content into a 3-5 part content series. Each part should be 300-500 words, self-contained but building on previous parts:\n\n${truncate(content, 4000)}`;
        break;
      }

      case "repurpose-seo": {
        const { content } = body;
        systemPrompt = `You are an SEO expert. Generate SEO metadata. Respond with ONLY valid JSON, no markdown:
{
  "metaTitle": "<max 60 chars>",
  "metaDescription": "<max 160 chars>",
  "focusKeyword": "<keyword phrase>",
  "internalLinks": [{ "anchorText": "<text>", "opportunity": "<description>" }]
}
Provide 3 internal linking opportunities.`;
        userPrompt = `Generate SEO metadata for this repurposed content:\n\n${truncate(content, 3000)}`;
        break;
      }

      case "repurpose-cta": {
        const { format, goal, contentSummary } = body;
        systemPrompt = `You are a conversion copywriting expert. Generate a platform-appropriate call-to-action. Return ONLY the CTA text (1-2 sentences), no JSON, no headers.`;
        userPrompt = `Generate platform-appropriate call-to-action for ${truncate(format, MAX_SHORT_FIELD)} with goal: ${truncate(goal, MAX_SHORT_FIELD)}. Content context: ${truncate(contentSummary, 500)}`;
        break;
      }

      // === AI HUMANIZER SPECIFIC ACTIONS ===

      case "humanizer-analyze": {
        const { content } = body;
        systemPrompt = `You are an AI content detection expert. Analyze content for AI-generated patterns. Respond with ONLY valid JSON, no markdown:
{
  "aiScore": <0-100>,
  "contentType": "<Blog|Academic|Marketing|Technical|Other>",
  "writingStyle": "<Professional|Casual|Technical|Academic|Creative>",
  "readingLevel": "<e.g. Grade 10>",
  "recommendedIntensity": "<Light|Medium|Aggressive>",
  "aiPatterns": [
    { "phrase": "<exact phrase from content>", "reason": "<why it sounds AI-generated>" }
  ],
  "sentenceVariety": "<Low|Medium|High>",
  "avgSentenceLength": <number>
}
Identify up to 8 AI patterns.`;
        userPrompt = `Analyze this content for AI-generated patterns:\n\n${truncate(content, 4000)}`;
        break;
      }

      case "humanizer-generate-content": {
        const { topic, contentType, length } = body;
        systemPrompt = `You are a content writer. Generate ${truncate(contentType, MAX_SHORT_FIELD) || 'blog post'} content using standard AI writing patterns. Output ONLY the content, no commentary.`;
        userPrompt = `Generate ${truncate(contentType, MAX_SHORT_FIELD) || 'blog post'} content about "${truncate(topic, MAX_SHORT_FIELD)}" in approximately ${truncate(length, 50) || '300-600'} words. Use standard AI writing patterns.`;
        break;
      }

      case "humanizer-score-after": {
        const { originalContent, humanizedContent } = body;
        systemPrompt = `You are an AI detection expert. Compare original and humanized content. Respond with ONLY valid JSON, no markdown:
{
  "before": { "aiScore": <0-100>, "readability": "<e.g. Grade 10>", "sentenceVariety": "<Low|Medium|High>" },
  "after": { "aiScore": <0-100>, "readability": "<e.g. Grade 9>", "sentenceVariety": "<Low|Medium|High>" },
  "improvement": <percentage points improved>,
  "humanLikelihood": <0-100>
}`;
        userPrompt = `Compare these two versions:\n\nORIGINAL:\n${truncate(originalContent, 2000)}\n\nHUMANIZED:\n${truncate(humanizedContent, 2000)}`;
        break;
      }

      case "humanizer-versions": {
        const { content, style, industry, readingLevel } = body;
        systemPrompt = `You are an expert content rewriter. Create 3 different humanized versions using different approaches. Respond with ONLY valid JSON, no markdown:
{
  "versionA": { "approach": "Conversational", "content": "<full humanized text>" },
  "versionB": { "approach": "Professional", "content": "<full humanized text>" },
  "versionC": { "approach": "Creative", "content": "<full humanized text>" }
}
Each version should sound naturally human while preserving the original meaning.`;
        userPrompt = `Create 3 humanized versions of this content.${style ? ` Target style: ${truncate(style, MAX_SHORT_FIELD)}.` : ''}${industry ? ` Industry: ${truncate(industry, MAX_SHORT_FIELD)}.` : ''}${readingLevel ? ` Reading level: ${truncate(readingLevel, 50)}.` : ''}\n\n${truncate(content, 3000)}`;
        break;
      }

      case "humanizer-originality": {
        const { content } = body;
        systemPrompt = `You are a content originality analyst. Check for clichés and overused patterns. Respond with ONLY valid JSON, no markdown:
{
  "uniquenessScore": <0-100>,
  "flaggedPhrases": [{ "phrase": "<phrase>", "issue": "<why it's not unique>" }],
  "suggestions": ["<improvement suggestion>"]
}
Flag up to 8 phrases, provide 3 suggestions.`;
        userPrompt = `Analyze this content for originality:\n\n${truncate(content, 3000)}`;
        break;
      }

      case "humanizer-bulk": {
        const { paragraphs, style, industry, intensity } = body;
        const validatedParagraphs = (paragraphs || []).slice(0, 20).map((p: string) => truncate(p, 5000));
        systemPrompt = `You are an expert humanizer. Humanize each paragraph separately while maintaining consistent tone. Respond with ONLY valid JSON array, no markdown:
[{ "original": "<original paragraph>", "humanized": "<humanized version>" }]
Intensity: ${truncate(intensity, 50) || 'medium'}.${style ? ` Style: ${truncate(style, MAX_SHORT_FIELD)}.` : ''}${industry ? ` Industry: ${truncate(industry, MAX_SHORT_FIELD)}.` : ''}`;
        userPrompt = `Humanize each paragraph:\n\n${validatedParagraphs.map((p: string, i: number) => `[${i + 1}] ${p}`).join('\n\n')}`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const result = await callAI(LOVABLE_API_KEY, systemPrompt, userPrompt);

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("ai-assistant error:", e);
    const status = e.status || 500;
    const message = e.message || (e instanceof Error ? e.message : "Unknown error");
    return new Response(JSON.stringify({ error: message }), {
      status, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
