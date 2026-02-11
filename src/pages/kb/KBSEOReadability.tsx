
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBSEOReadability() {
  return (
    <ArticleLayout
      title="SEO Analysis & Readability Scoring"
      description="Optimize your blog posts with the built-in SEO Analysis Panel and Readability Panel before publishing to maximize search rankings and reader engagement."
      category="Blog Content Creator"
      categoryIcon={PenTool}
      readTime="5 min read"
      keywords="SEO analysis tool, readability score, blog SEO optimization, Flesch-Kincaid score, on-page SEO"
      prevArticle={{ title: "Outline Builder", link: "/knowledge-base/outline-builder" }}
    >
      <h2>SEO Analysis Panel</h2>
      <p>The SEO Analysis Panel evaluates your blog post against <strong>Google's on-page SEO best practices</strong> and provides actionable recommendations.</p>

      <h3>What It Checks</h3>
      <ul>
        <li><strong>Keyword density</strong> — Is your target keyword used naturally (1-2% density)?</li>
        <li><strong>Heading hierarchy</strong> — Proper use of H1, H2, H3, H4 tags</li>
        <li><strong>Meta title</strong> — Under 60 characters with the main keyword</li>
        <li><strong>Meta description</strong> — Under 160 characters, compelling and keyword-rich</li>
        <li><strong>Internal linking</strong> — Opportunities to link to other content</li>
        <li><strong>Image alt text</strong> — Recommendations for descriptive alt attributes</li>
        <li><strong>Content length</strong> — Whether word count meets competitive benchmarks</li>
      </ul>

      <h3>SEO Score</h3>
      <p>Your post receives a score from 0-100:</p>
      <ul>
        <li><strong>80-100 (Green)</strong> — Well-optimized, ready to publish</li>
        <li><strong>60-79 (Yellow)</strong> — Good foundation, address the flagged items</li>
        <li><strong>Below 60 (Red)</strong> — Needs significant SEO improvements</li>
      </ul>

      <h2>Readability Panel</h2>
      <p>The Readability Panel evaluates how easy your content is to read using the <strong>Flesch-Kincaid</strong> readability formula.</p>

      <h3>Score Interpretation</h3>
      <ul>
        <li><strong>Grade 6-8</strong> — Very accessible, great for consumer content</li>
        <li><strong>Grade 9-12</strong> — Ideal for most blog posts and marketing content</li>
        <li><strong>Grade 13-16</strong> — College level, appropriate for B2B and professional content</li>
        <li><strong>Grade 17+</strong> — Expert level, only for specialized technical audiences</li>
      </ul>

      <h3>What It Flags</h3>
      <ul>
        <li><strong>Long sentences</strong> — Sentences over 25 words that could be split</li>
        <li><strong>Complex vocabulary</strong> — Words that could be replaced with simpler alternatives</li>
        <li><strong>Passive voice</strong> — Instances where active voice would be stronger</li>
        <li><strong>Paragraph length</strong> — Paragraphs over 150 words that should be broken up</li>
      </ul>

      <h2>Optimizing Before Publishing</h2>
      <ol>
        <li><strong>Write your content first</strong> — Don't optimize while writing, it kills creativity</li>
        <li><strong>Run SEO Analysis</strong> — Fix keyword issues, heading structure, and meta tags</li>
        <li><strong>Check Readability</strong> — Simplify flagged sentences and reduce grade level if needed</li>
        <li><strong>Run Fact Checker</strong> — Verify statistics and claims before publishing</li>
        <li><strong>Final review</strong> — Read through once more for flow and accuracy</li>
      </ol>

      <blockquote><strong>Pro Tip:</strong> Aim for a Flesch-Kincaid score of 60-70 (8th-9th grade level) for most blog content. This is the sweet spot where content is accessible to the widest audience while still sounding professional.</blockquote>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore the <Link to="/knowledge-base">Knowledge Base</Link> for guides on other tools, or read the <Link to="/best-practices">Best Practices Guide</Link> for expert blogging strategies.</p>
    </ArticleLayout>
  );
}
