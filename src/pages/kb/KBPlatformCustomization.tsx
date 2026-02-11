
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBPlatformCustomization() {
  return (
    <ArticleLayout
      title="Platform-Specific Customization Guide"
      description="Customize repurposed content for Twitter/X, LinkedIn, Instagram, Facebook, and other platforms with AI-optimized tone, length, and formatting."
      category="Content Repurposing"
      categoryIcon={FileText}
      readTime="5 min read"
      keywords="platform customization, social media content optimization, Twitter thread, LinkedIn post, Instagram caption"
      prevArticle={{ title: "Content Analyzer", link: "/knowledge-base/content-analyzer" }}
      nextArticle={{ title: "Multi-Length Versions", link: "/knowledge-base/multi-length-versions" }}
    >
      <h2>Why Platform Customization Matters</h2>
      <p>A LinkedIn post and an Instagram caption serve completely different audiences and follow different conventions. The Platform Customization feature ensures each output is <strong>native to its destination platform</strong>.</p>

      <h2>Supported Platforms</h2>
      <ul>
        <li><strong>Twitter/X</strong> — Concise, hook-driven threads with hashtags and engagement prompts</li>
        <li><strong>LinkedIn</strong> — Professional insights with line breaks, thought leadership framing</li>
        <li><strong>Instagram</strong> — Visual-first captions with emoji usage, hashtag blocks, CTA</li>
        <li><strong>Facebook</strong> — Conversational, community-oriented, longer-form allowed</li>
        <li><strong>YouTube</strong> — Video descriptions with timestamps, keywords, and CTAs</li>
        <li><strong>Pinterest</strong> — Pin descriptions optimized for search and discovery</li>
        <li><strong>Reddit</strong> — Community-appropriate tone, value-first, minimal self-promotion</li>
        <li><strong>TikTok</strong> — Script-style content, trending hooks, short and punchy</li>
        <li><strong>Email Newsletter</strong> — Subject line + body with personal tone and CTA</li>
        <li><strong>Blog Summary</strong> — Condensed version with SEO meta description</li>
      </ul>

      <h2>How to Customize</h2>
      <ol>
        <li>After content analysis, select your desired <strong>output formats</strong></li>
        <li>Click the <strong>Platform Customization</strong> settings for each format</li>
        <li>Adjust <strong>tone, CTA text, hashtag style, and length preferences</strong></li>
        <li>Generate — each format follows its platform's best practices automatically</li>
      </ol>

      <h2>Platform-Specific Tips</h2>
      <h4>Twitter/X Threads</h4>
      <p>Keep each tweet under 280 characters. Lead with a strong hook. End with a CTA. The AI auto-numbers your thread posts.</p>

      <h4>LinkedIn Posts</h4>
      <p>Use generous line breaks. Open with a bold statement. Include a professional insight or personal story. The AI formats for LinkedIn's algorithm preferences.</p>

      <h4>Instagram Captions</h4>
      <p>Front-load the first line (it's the preview). Use 20-30 relevant hashtags placed after the main content. Include a clear CTA.</p>

      <hr />
      <h2>Next Steps</h2>
      <p>Generate different lengths for each format: <Link to="/knowledge-base/multi-length-versions">Using Multi-Length Versions →</Link></p>
    </ArticleLayout>
  );
}
