
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBMultiLengthVersions() {
  return (
    <ArticleLayout
      title="Using Multi-Length Versions"
      description="Generate Short, Standard, and Long versions of each repurposed content format to match different platform requirements and audience preferences."
      category="Content Repurposing"
      categoryIcon={FileText}
      readTime="3 min read"
      keywords="multi-length content, short standard long versions, content length optimization, repurposed content variations"
      prevArticle={{ title: "Platform Customization", link: "/knowledge-base/platform-customization" }}
      nextArticle={{ title: "Hashtags & Scheduling", link: "/knowledge-base/hashtag-scheduling" }}
    >
      <h2>Why Multiple Lengths?</h2>
      <p>Different situations call for different content lengths. A quick social update needs a short version, while a detailed LinkedIn article needs a long one. Multi-Length Versions give you <strong>three variations of every format</strong> so you always have the right fit.</p>

      <h2>The Three Length Options</h2>
      <ul>
        <li><strong>Short</strong> — Condensed, punchy, key message only. Best for quick posts, ads, and teasers.</li>
        <li><strong>Standard</strong> — Balanced length following platform conventions. The default and most versatile option.</li>
        <li><strong>Long</strong> — Expanded with additional context, examples, and detail. Ideal for in-depth LinkedIn posts, newsletters, and blog summaries.</li>
      </ul>

      <h2>How to Generate Multiple Lengths</h2>
      <ol>
        <li>Select your output format in the Content Repurposing tool</li>
        <li>Look for the <strong>length selector</strong> (Short / Standard / Long)</li>
        <li>Choose your preferred length or generate all three for comparison</li>
        <li>Preview each version and select the best fit</li>
      </ol>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Generate all three</strong> when you're unsure — compare and choose the strongest</li>
        <li><strong>Use Short for A/B testing</strong> — Quick posts are great for testing engagement before expanding</li>
        <li><strong>Use Long for SEO content</strong> — More words = more keyword opportunities for blog summaries</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Maximize reach with smart hashtags and posting schedules: <Link to="/knowledge-base/hashtag-scheduling">Hashtag & Scheduling Recommendations →</Link></p>
    </ArticleLayout>
  );
}
