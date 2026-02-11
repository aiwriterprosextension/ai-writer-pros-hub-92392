
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBHashtagResearch() {
  return (
    <ArticleLayout
      title="Hashtag Research & Strategy"
      description="Find trending, niche, and branded hashtags to maximize reach on each social platform using the AI-powered Hashtag Research tool."
      category="Social Media Suite"
      categoryIcon={MessageSquare}
      readTime="4 min read"
      keywords="hashtag research tool, trending hashtags, social media hashtag strategy, Instagram hashtags, Twitter hashtags"
      prevArticle={{ title: "Content Calendar", link: "/knowledge-base/content-calendar" }}
    >
      <h2>Why Hashtag Research Matters</h2>
      <p>The right hashtags can <strong>double or triple your organic reach</strong>. The Hashtag Research tool analyzes your content and generates platform-specific hashtag sets optimized for maximum visibility.</p>

      <h2>How the Tool Works</h2>
      <ol>
        <li>Enter your post topic or paste your content</li>
        <li>Select your target platform</li>
        <li>The AI generates a <strong>categorized hashtag set</strong></li>
        <li>Review estimated reach for each hashtag group</li>
        <li>Copy the entire set or pick individual hashtags</li>
      </ol>

      <h2>Hashtag Categories</h2>
      <ul>
        <li><strong>High-volume</strong> — Popular hashtags for broad reach (100K+ posts). Use 2-3 per post.</li>
        <li><strong>Mid-volume</strong> — Moderate competition for better visibility. Use 5-10 per post.</li>
        <li><strong>Niche</strong> — Low competition, highly targeted. Best for discoverability. Use 5-10.</li>
        <li><strong>Branded</strong> — Your brand-specific tags for community building. Use 1-2.</li>
      </ul>

      <h2>Platform-Specific Guidelines</h2>
      <h4>Instagram</h4>
      <p>Use 20-30 hashtags. Mix all four categories. Place in first comment or at the end of your caption.</p>

      <h4>Twitter/X</h4>
      <p>Use 2-3 hashtags maximum. Focus on trending and niche tags. Place inline or at the end.</p>

      <h4>LinkedIn</h4>
      <p>Use 3-5 hashtags. Professional and industry-specific tags perform best. Place at the end of your post.</p>

      <h4>TikTok</h4>
      <p>Use 4-6 hashtags. Mix trending sounds/challenges with niche topic tags.</p>

      <blockquote><strong>Pro Tip:</strong> Never use the same hashtag set across all platforms. Each platform's algorithm and audience respond differently to hashtag strategies.</blockquote>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore more tools in the <Link to="/knowledge-base">Knowledge Base</Link> or read expert social media tips in the <Link to="/best-practices">Best Practices Guide</Link>.</p>
    </ArticleLayout>
  );
}
