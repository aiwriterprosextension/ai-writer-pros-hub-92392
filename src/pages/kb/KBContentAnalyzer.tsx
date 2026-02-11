
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBContentAnalyzer() {
  return (
    <ArticleLayout
      title="Content Analyzer & Smart Format Matching"
      description="How the Content Repurposing tool's AI analyzer examines your content and recommends the best output formats for each platform."
      category="Content Repurposing"
      categoryIcon={FileText}
      readTime="4 min read"
      keywords="content analyzer, smart format matching, content repurposing AI, multi-format content"
      nextArticle={{ title: "Platform Customization", link: "/knowledge-base/platform-customization" }}
    >
      <h2>What Is the Content Analyzer?</h2>
      <p>The Content Analyzer is the first step in the repurposing workflow. It scans your input content and provides insights on <strong>key themes, tone, structure, and content type</strong> — then recommends which output formats will work best.</p>

      <h2>How It Works</h2>
      <ol>
        <li><strong>Paste your source content</strong> — Blog posts, articles, newsletters, or any long-form text</li>
        <li><strong>Click "Analyze Content"</strong> — The AI examines your text in seconds</li>
        <li><strong>Review recommendations</strong> — See which formats match your content's strengths</li>
        <li><strong>Select formats and generate</strong> — Choose from recommended formats or pick your own</li>
      </ol>

      <h2>What the Analyzer Detects</h2>
      <ul>
        <li><strong>Content type</strong> — Blog post, how-to guide, opinion piece, news article, product review</li>
        <li><strong>Key themes</strong> — Primary topics and supporting subjects identified in your text</li>
        <li><strong>Tone</strong> — Professional, casual, technical, persuasive, informational</li>
        <li><strong>Word count and density</strong> — Length analysis that determines which formats are feasible</li>
        <li><strong>Structure quality</strong> — Whether headings, lists, and sections are present</li>
      </ul>

      <h2>Smart Format Recommendations</h2>
      <p>Based on analysis, the tool suggests formats ranked by compatibility:</p>
      <ul>
        <li><strong>High match</strong> — Formats that naturally fit your content (e.g., a how-to blog → Twitter thread)</li>
        <li><strong>Medium match</strong> — Formats that work with some adaptation</li>
        <li><strong>Low match</strong> — Possible but may require significant reshaping</li>
      </ul>

      <blockquote><strong>Pro Tip:</strong> Start with your highest-quality content. The better the source material, the better every repurposed format will be.</blockquote>

      <hr />
      <h2>Next Steps</h2>
      <p>Learn how to customize output for each platform: <Link to="/knowledge-base/platform-customization">Platform-Specific Customization Guide →</Link></p>
    </ArticleLayout>
  );
}
