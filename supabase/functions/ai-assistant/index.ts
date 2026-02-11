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
  "amazon-reviews": "Amazon Affiliate Review Generator that creates product reviews and comparison tables with buyer personas, SEO optimization, FAQ sections, and authenticity enhancement.",
  "content-repurposing": "Content Repurposing tool that transforms content into multiple platform formats (Twitter threads, LinkedIn posts, email newsletters, etc.).",
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
        const chatSystemPrompt = `You are a helpful AI assistant for Writer Pros, a SaaS content creation platform. The user is currently using: ${toolContext}

You help users get the most out of the tool by:
- Answering questions about best practices (tone, word count, keywords, platform strategies)
- Providing tips for better results
- Explaining features and how to use them
- Suggesting optimal settings

Keep responses concise (2-4 sentences max unless asked for detail). Be friendly and actionable.`;
        
        const chatMessages = [
          { role: "system", content: chatSystemPrompt },
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

      // === AMAZON AFFILIATE SPECIFIC ACTIONS ===

      case "extract-product": {
        const { input } = body;
        systemPrompt = `You are a product information expert. Extract product information from an Amazon URL or ASIN. Provide educated guesses based on your knowledge. Respond with ONLY valid JSON, no markdown:
{
  "productName": "<full product name>",
  "brand": "<brand name>",
  "category": "<category>",
  "features": ["<feature 1>", "<feature 2>", ...up to 10],
  "estimatedPriceRange": "<e.g. $50-$80>",
  "confidence": <0.0-1.0 how confident you are>
}`;
        userPrompt = `Extract product information from this identifier: ${input}. If it's an Amazon URL, extract the ASIN first. Provide product name, category, brand, 7-10 key features, and estimated price range.`;
        break;
      }

      case "detect-features": {
        const { productName } = body;
        systemPrompt = `You are a product expert. Research and suggest key features for this product that buyers care about most. Respond with ONLY valid JSON, no markdown:
[
  { "feature": "<feature description>", "importance": <1-5> },
  ...up to 10 features
]
Rank by importance (5 = most important).`;
        userPrompt = `Research and suggest 7-10 key features for this product: ${productName}. Focus on features buyers care about most.`;
        break;
      }

      case "generate-persona": {
        const { productName, problem, priceSensitivity, experienceLevel } = body;
        systemPrompt = `You are a marketing expert specializing in buyer personas. Create a concise target buyer persona. Respond with ONLY the persona description (2-3 sentences), no JSON, no markdown headers.`;
        userPrompt = `Create target buyer persona for "${productName}" that solves "${problem || 'general needs'}" for ${experienceLevel || 'intermediate'} users at ${priceSensitivity || 'mid-range'} price point. Write 2-3 sentences describing the ideal buyer, their motivations, and what they value most.`;
        break;
      }

      case "suggest-alternatives": {
        const { productName, category } = body;
        systemPrompt = `You are a product comparison expert. Find competing alternatives. Respond with ONLY valid JSON array, no markdown:
[
  {
    "name": "<product name>",
    "differentiator": "<key differentiator, 1 sentence>",
    "advantage": "<main advantage over the original product>"
  }
]
Provide exactly 3 alternatives.`;
        userPrompt = `Find 3 alternative products that compete with "${productName}" in the ${category || 'general'} category. For each, provide the product name, key differentiator, and main advantage over the original.`;
        break;
      }

      case "generate-faq": {
        const { productName, category } = body;
        systemPrompt = `You are an SEO content expert. Generate FAQ questions and answers that potential buyers typically ask. Make them conversational and optimized for Google featured snippets. Respond with ONLY valid JSON array, no markdown:
[
  { "question": "<question>", "answer": "<answer, 2-3 sentences>" }
]
Provide 6-8 Q&A pairs.`;
        userPrompt = `Generate 6-8 frequently asked questions about "${productName}" (category: ${category || 'general'}) that potential buyers typically have. Make them conversational and SEO-optimized.`;
        break;
      }

      case "generate-disclosure": {
        const { tone } = body;
        systemPrompt = `You are an FTC compliance expert. Generate an affiliate disclosure statement. Return ONLY the disclosure text, no JSON, no markdown headers.`;
        userPrompt = `Generate an FTC-compliant Amazon affiliate disclosure with a ${tone || 'standard and professional'} tone. Keep it concise but legally compliant. Include mention of earning commissions from qualifying purchases.`;
        break;
      }

      case "enhance-authenticity": {
        const { reviewContent, testingDuration, primaryUseCase, notableExperience } = body;
        systemPrompt = `You are an expert review writer. Enhance the given review by weaving in authentic personal experience details naturally throughout the text. Make it sound genuine and trustworthy. Do NOT add any meta-commentary, just return the enhanced review text.`;
        userPrompt = `Enhance this review with authentic personal experience details:

Testing Duration: ${testingDuration || 'not specified'}
Primary Use Case: ${primaryUseCase || 'general use'}
Notable Experience: ${notableExperience || 'none specified'}

Original Review:
${reviewContent?.substring(0, 3000) || ''}`;
        break;
      }

      case "review-score": {
        const { reviewContent, seoKeyword, targetWordCount } = body;
        systemPrompt = `You are a content quality analyst specializing in product reviews. Analyze the review and provide quality scores. Respond with ONLY valid JSON, no markdown:
{
  "seoScore": <1-100>,
  "readabilityGrade": "<e.g. Grade 8>",
  "readabilityScore": <1-100>,
  "biasDetection": "<Balanced|Positive|Negative>",
  "authenticityScore": <1-100>,
  "wordCount": <actual word count>,
  "keywordDensity": <percentage as number, e.g. 1.5>,
  "suggestions": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}`;
        userPrompt = `Analyze this product review for quality:
SEO Keyword: ${seoKeyword || 'none'}
Target Word Count: ${targetWordCount || 'not specified'}

Review:
${reviewContent?.substring(0, 3000) || ''}`;
        break;
      }

      case "regenerate-section": {
        const { reviewContent, section, productName, tone } = body;
        systemPrompt = `You are an expert product review writer. Regenerate ONLY the specified section of the review. Return ONLY the new section text, no commentary.`;
        userPrompt = `Regenerate the "${section}" section of this product review for "${productName}". Tone: ${tone || 'balanced'}. 

Current review:
${reviewContent?.substring(0, 3000) || ''}

Return ONLY the regenerated ${section} section.`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    // For non-chat actions
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
