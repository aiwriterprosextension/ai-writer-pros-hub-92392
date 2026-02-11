
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBTopicKeywords() {
  return (
    <ArticleLayout
      title="Topic Research & Keyword Targeting"
      description="Use the Blog Content Creator's AI-powered keyword research and topic generation tools to find high-opportunity content ideas that rank on Google."
      category="Blog Content Creator"
      categoryIcon={PenTool}
      readTime="5 min read"
      keywords="keyword research AI, blog topic generator, SEO keyword targeting, content ideas tool, blog writing SEO"
      nextArticle={{ title: "Outline Builder", link: "/knowledge-base/outline-builder" }}
    >
      <h2>Finding the Right Topics</h2>
      <p>The Topic Generator creates <strong>content ideas based on your niche, competitor gaps, and trending topics</strong>. It's the fastest way to fill your content calendar with ideas that have real search demand.</p>

      <h3>How to Generate Topics</h3>
      <ol>
        <li>Open the <Link to="/dashboard/blog-creator">Blog Content Creator</Link></li>
        <li>Click <strong>"Generate Topics"</strong> to open the Topic Generator Modal</li>
        <li>Enter your niche or subject area</li>
        <li>Review 10-20 topic suggestions ranked by estimated potential</li>
        <li>Select a topic to begin building your blog post</li>
      </ol>

      <h2>Keyword Research</h2>
      <p>The Keyword Research Modal helps you find the <strong>right keywords to target</strong> for each blog post:</p>
      <ul>
        <li><strong>Search volume estimates</strong> — How many people search for this keyword monthly</li>
        <li><strong>Competition level</strong> — Low, Medium, or High difficulty to rank</li>
        <li><strong>Related keywords</strong> — Long-tail variations and semantic keywords</li>
        <li><strong>Question keywords</strong> — "How to," "What is," and "Why" queries for featured snippets</li>
      </ul>

      <h2>Keyword Targeting Best Practices</h2>
      <ul>
        <li><strong>Target 1 primary keyword</strong> per blog post — Enter it in the keywords field</li>
        <li><strong>Include 2-3 secondary keywords</strong> — Related terms that support the primary topic</li>
        <li><strong>Prioritize long-tail keywords</strong> — "Best wireless headphones for running 2025" over "wireless headphones"</li>
        <li><strong>Match search intent</strong> — Informational keywords need guides; transactional keywords need reviews</li>
        <li><strong>Target 100+ monthly searches</strong> with low-to-medium competition for fastest results</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Structure your post for success: <Link to="/knowledge-base/outline-builder">Outline Builder & Section Writing →</Link></p>
    </ArticleLayout>
  );
}
