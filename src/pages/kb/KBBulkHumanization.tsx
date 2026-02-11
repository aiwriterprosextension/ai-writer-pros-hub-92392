
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBBulkHumanization() {
  return (
    <ArticleLayout
      title="Bulk Humanization Mode"
      description="Process multiple paragraphs separately while maintaining consistent tone and style across your entire document using Bulk Humanization Mode."
      category="AI Humanizer"
      categoryIcon={Shield}
      readTime="4 min read"
      keywords="bulk humanization, batch AI humanizer, paragraph processing, large document humanization"
      prevArticle={{ title: "Industry Customization", link: "/knowledge-base/industry-customization" }}
      nextArticle={{ title: "Before/After Scores", link: "/knowledge-base/before-after-scores" }}
    >
      <h2>What Is Bulk Humanization Mode?</h2>
      <p>
        Bulk Humanization Mode processes each paragraph of your content <strong>individually</strong> while maintaining a consistent tone and style across the entire document. This gives you granular control over long-form content without sacrificing coherence.
      </p>

      <h2>When to Use Bulk Mode</h2>
      <ul>
        <li><strong>Documents over 500 words</strong> — Long articles, reports, and papers benefit from paragraph-level processing</li>
        <li><strong>Mixed-quality content</strong> — When some paragraphs need heavy humanization but others are already natural-sounding</li>
        <li><strong>Selective regeneration</strong> — When you want to redo specific sections without affecting the rest</li>
        <li><strong>Quality control</strong> — Reviewing humanization results paragraph-by-paragraph is easier than scanning a full document</li>
      </ul>

      <h2>How to Use Bulk Mode</h2>
      <h3>Step 1: Enable the Toggle</h3>
      <p>In the AI Humanizer, find and enable the <strong>"Process Multiple Paragraphs Separately"</strong> toggle. The tool automatically detects paragraph breaks in your content.</p>

      <h3>Step 2: Review Paragraph Count</h3>
      <p>After enabling, you'll see a count: <strong>"X paragraphs detected."</strong> The tool splits on double line breaks (<code>\n\n</code>) to identify paragraph boundaries.</p>

      <h3>Step 3: Humanize All Paragraphs</h3>
      <p>Click the Humanize button. Each paragraph is processed separately using your selected settings (intensity, style, industry, reading level).</p>

      <h3>Step 4: Review in Accordion View</h3>
      <p>Results appear as an <strong>expandable accordion</strong>:</p>
      <ul>
        <li>Each paragraph is shown as a collapsible section</li>
        <li>Expand any paragraph to see <strong>Original vs. Humanized</strong> side by side</li>
        <li>Click <strong>"Regenerate This Paragraph"</strong> to redo any individual section</li>
      </ul>

      <h3>Step 5: Combine and Export</h3>
      <p>Once satisfied, click <strong>"Combine All Paragraphs"</strong> to create the final concatenated document. Export using any of the standard options (clipboard, .txt, .docx, .pdf).</p>

      <h2>Tips for Best Results</h2>
      <ul>
        <li><strong>Ensure clean paragraph breaks</strong> — Use double line breaks between paragraphs for accurate detection</li>
        <li><strong>Regenerate selectively</strong> — Only redo paragraphs that don't meet your standards to save time and credits</li>
        <li><strong>Check tone consistency</strong> — Read the combined output to verify paragraphs flow naturally together</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Understand your humanization results: <Link to="/knowledge-base/before-after-scores">Understanding Before/After Scores →</Link></p>
    </ArticleLayout>
  );
}
