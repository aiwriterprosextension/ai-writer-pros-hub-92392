
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBBatchExport() {
  return (
    <ArticleLayout
      title="Batch Export & Content Series"
      description="Export all repurposed content formats at once and create multi-part content series from long-form articles for sustained audience engagement."
      category="Content Repurposing"
      categoryIcon={FileText}
      readTime="3 min read"
      keywords="batch export content, content series creator, multi-format download, content repurposing export"
      prevArticle={{ title: "Hashtags & Scheduling", link: "/knowledge-base/hashtag-scheduling" }}
    >
      <h2>Batch Export</h2>
      <p>Once you've generated multiple repurposed formats, use <strong>Batch Export</strong> to download everything at once instead of copying each format individually.</p>

      <h3>How to Batch Export</h3>
      <ol>
        <li>Generate your desired formats using the Content Repurposing tool</li>
        <li>Click the <strong>"Batch Export"</strong> button in the output area</li>
        <li>Select which formats to include in the export</li>
        <li>Choose your download format (text files or a combined document)</li>
      </ol>

      <h2>Content Series Creator</h2>
      <p>The Content Series Creator transforms long-form content into a <strong>multi-part social media series</strong> with consistent branding and narrative flow.</p>

      <h3>How It Works</h3>
      <ul>
        <li><strong>Splits your content</strong> into logical parts (typically 3-7 parts)</li>
        <li><strong>Adds series branding</strong> — Part numbers, consistent hashtags, and series titles</li>
        <li><strong>Creates cliffhangers</strong> — Each part ends with a hook to the next installment</li>
        <li><strong>Maintains narrative flow</strong> — Parts build on each other logically</li>
      </ul>

      <h2>Best Practices</h2>
      <ul>
        <li>Use <strong>Content Series</strong> for pillar content like comprehensive guides or research reports</li>
        <li>Post one part per day for <strong>sustained visibility</strong> over a full week</li>
        <li>Reference previous parts with <strong>links or mentions</strong> to drive traffic to the full series</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore more tools in the <Link to="/knowledge-base">Knowledge Base</Link> or read the <Link to="/best-practices">Best Practices Guide</Link> for expert tips.</p>
    </ArticleLayout>
  );
}
